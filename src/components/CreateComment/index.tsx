import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
import { MdImage } from 'react-icons/md';

import React, { MutableRefObject, useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Tweet } from '../../types/Tweet';

interface Props {
  refTextarea: MutableRefObject<HTMLTextAreaElement | null>
  tweetId: string
  tweet: Tweet
  replies: Tweet[] | null
  setReplies: Dispatch<SetStateAction<Tweet[] | null>>
}

export default function CreateComment({refTextarea, tweetId, replies, setReplies, tweet}: Props) {
  const [canUserReply, setCanUserReply] = useState<boolean | null>(null);
  const {data: session} = useSession();
  const formData = new FormData();
  const commentMedia = useRef<HTMLInputElement | null>(null);

  const handleComment = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!session) {
        toast.error('Cannot submit Reply - User not logged in!');
        return null;
      }

      if (commentMedia.current?.files) {
        formData.append('media', commentMedia.current?.files[0]);
      }

      if (refTextarea.current?.value) {
        formData.append('content', refTextarea.current.value);
      }

      formData.append('userId', session.id);
      formData.append('repliesTo', tweetId);
      formData.append('action', '1');

      if (!replies) {
        await axios.get('/api/social/reply', {
          params: {
            tweetId: tweet.tweetId ? tweet.tweetId._id : tweet._id
          }
        }).then(response => {
          setReplies(response.data);
        });
      }

      await axios.post('/api/social/reply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (refTextarea.current) {
          refTextarea.current.value = '';
        }
        setReplies(prev => {
          if (prev) {
            const updatedData = [
              ...prev,
              {
                ...response.data,
                userId: {
                  name: session?.user?.name
                }
              }
            ];
            return updatedData;
          }
          return prev;
        });
      });
    }
  };

  useEffect(() => {
    if (tweet.tweetId) {
      if (tweet.tweetId.public) {
        setCanUserReply(true);
      } else {
        if (session?.id === tweet.tweetId.userId._id) {
          setCanUserReply(true);
        } else {
          tweet.tweetId.userId.follows.map((user: string) => {
            if (user === session?.id) {
              setCanUserReply(true);
            } else {
              setCanUserReply(false);
            }
          });
        }
      }
    } else {
      if (tweet.public) {
        setCanUserReply(true);
      } else {
        if (session?.id === tweet.userId._id) {
          setCanUserReply(true);
        } else {
          tweet.userId.follows.map(user => {
            if (user === session?.id) {
              setCanUserReply(true);
            } else {
              setCanUserReply(false);
            }
          });
        }
      }
    }
  }, [session]);

  return (
    <S.Container>
      <Image src={pfpPlaceholder} width={40} height={40} alt='pfp' />
      <S.TextAreaContent>
        {
          canUserReply ? (
            <>
              <S.TextArea placeholder='Tweet your reply' ref={refTextarea} onKeyDown={(e) => handleComment(e)}/>
              <MdImage color='#BDBDBD' size={20} onClick={() => commentMedia.current?.click()}/>
              <input type='file' hidden ref={commentMedia}/>
            </>
          ) : <p style={{color: '#BDBDBD'}}>Only accounts that {tweet.userId.name || tweet.tweetId.userId.name} follows can Reply.</p>
        }
      </S.TextAreaContent>
    </S.Container>
  );
}
