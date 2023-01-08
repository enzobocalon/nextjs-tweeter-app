import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import { Tweet } from '../../types/Tweet';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { MdDelete } from 'react-icons/md';

interface Props {
  reply: Tweet | null
  setReplies: Dispatch<SetStateAction<Tweet[] | null>>
}

export default function Comments({reply, setReplies}: Props) {
  const {data: session} = useSession();
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [replyState, setReplyState] = useState(reply);

  if (!reply) {
    return null;
  }

  const formData = new FormData();
  formData.append('replyId', reply._id);
  formData.append('userId', session?.id as string);
  formData.append('action', '2');

  const handleLike = async () => {
    await axios.post('/api/social/reply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.data.isNew) {
        setLike(true);
        setReplyState(prev => {
          if (prev) {
            const updatedData = {
              ...prev,
              likes: [
                ...prev.likes,
                session?.id
              ]
            };
            return updatedData;
          }
          return prev;
        });
      } else {
        setLike(false);
        setReplyState(prev => {
          if (prev) {
            const updatedData = {
              ...prev,
              likes: prev.likes.filter(user => user !== session?.id)
            };
            return updatedData;
          }
          return prev;
        });
      }
    });
  };

  const handleDelete = async (id: string) => {
    await axios.delete('/api/social/reply', {
      params: {
        replyId: id,
        userId: session?.id
      }
    }).then(() => {
      setReplies(prev => {
        if (prev) {
          return prev.filter(item => item._id !== id);
        } else {
          return prev;
        }
      });
    });
  };

  useEffect(() => {
    reply.likes.map(user => {
      if (user === session?.id) {
        setLike(true);
      } else {
        setLike(false);
      }
    });
  }, [session]);
  return (
    <S.Container>
      <Image src={replyState?.userId.avatar ? `/uploads/${replyState.userId.avatar}` : pfpPlaceholder.src} width={40} height={40} alt='icon' />

      <S.CommentContent>

        <S.CommentContentContainer>
          <S.CommentHeader>
            <div>
              <span>{replyState?.userId.name}</span>
              <span>24 August at 20:43</span>
            </div>
            <SlOptionsVertical color='#828282' onClick={() => setModal(prev => !prev)}/>

            {
              modal && (
                <S.Modal>
                  {
                    reply.userId._id === session?.id ? (
                      <S.ModalContent onClick={() => handleDelete(reply._id)}>
                        <MdDelete color='#BDBDBD'/>
                        <span>Delete</span>
                      </S.ModalContent>
                    ) : (
                      <p>No action available</p>
                    )
                  }
                </S.Modal>
              )
            }
          </S.CommentHeader>
          <S.Comment>
            <p>{replyState?.content}</p>
            {
              reply.media && reply.media[0] !== ''  ? <img src={`./uploads/${reply.media[0]}`} alt='image'/> : null
            }
          </S.Comment>
        </S.CommentContentContainer>
        <S.FooterContainer>
          <S.Action onClick={() => handleLike()}>
            <IoMdHeartEmpty size={18} color={like ? 'rgb(235, 87, 87)' : ''}/>
            <span style={like ? {color: 'rgb(235, 87, 87)'} : {}}>Like</span>
          </S.Action>
          <S.Action>
            <span>·</span>
          </S.Action>
          <S.Action>
            <span>{replyState?.likes.length + ' Likes'}</span>
          </S.Action>
        </S.FooterContainer>
      </S.CommentContent>
    </S.Container>
  );
}
