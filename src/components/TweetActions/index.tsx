import axios from 'axios';
import { Session } from 'next-auth';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import * as S from './styles';

import { MdOutlineModeComment, MdOutlineBookmarkBorder } from 'react-icons/md';
import { AiOutlineRetweet } from 'react-icons/ai';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Tweet } from '../../types/Tweet';

interface Props {
  tweet: Tweet,
  session: Session | null,
  setTweetData: Dispatch<SetStateAction<Tweet>>
}

export default function TweetActions({tweet, session, setTweetData}: Props) {
  const [like, setLike] = useState(false);
  const [retweets, setRetweets] = useState(false);

  const handleLike = async () => {
    await axios.post('/api/social/tweet-status', {
      action: 1,
      tweetId: tweet.tweetId ? tweet.tweetId._id : tweet._id,
      userId: session?.id
    }).then(response => {
      if (response.data.isNew) {
        setLike(true);
        setTweetData(prev => {
          if (prev.tweetId) {
            const updatedData = {
              ...prev,
              tweetId: {
                ...prev.tweetId,
                likes: [
                  ...prev.tweetId.likes,
                  session?.id
                ]
              }
            };
            return updatedData;
          } else {
            const updatedData = {
              ...prev,
              likes: [
                ...prev.likes,
                session?.id
              ],
            };
            return updatedData;
          }
        });
      } else {
        setLike(false);
        setTweetData(prev => {
          if (prev.tweetId) {
            const updatedData = {
              ...prev,
              tweetId: {
                ...prev.tweetId,
                likes: prev.tweetId.likes.filter((user: string) => user !== session?.id)
              }
            };
            return updatedData;
          } else {
            const updatedData = {
              ...prev,
              likes: prev.likes.filter(userId => userId !== session?.id)
            };
            return updatedData;
          }
        });
      }
    });
  };

  const handleRetweet = async () => {
    await axios.post('/api/social/tweet-status', {
      action: 2,
      tweetId: tweet.tweetId ? tweet.tweetId._id : tweet._id,
      userId: session?.id
    }).then(response => {
      if (response.data.isNew) {
        setRetweets(true);
        setTweetData(prev => {
          const updatedData = {
            ...prev,
            retweets: [
              ...prev.retweets,
              session?.id
            ],
          };
          return updatedData;
        });
      } else {
        setRetweets(false);
        setTweetData(prev => {
          const updatedData = {
            ...prev,
            retweets: prev.tweetId ? prev.tweetId.retweets.filter((userId: string) => userId !== session?.id) : prev.retweets.filter(userId => userId !== session?.id)
          };
          return updatedData;
        });
      }
    });
  };

  useEffect(() => {
    if (tweet.likes) {
      tweet.likes.map((data) => {
        if (!data) {
          return;
        }
        if (data.toString() === session?.id) {
          setLike(true);
        }
      });
    } else {
      tweet.tweetId.likes.map((data: Tweet) => {
        if (!data) {
          return;
        }

        if (data.toString() === session?.id) {
          setLike(true);
        }
      });
    }
  }, [session]);

  useEffect(() => {
    if (tweet.retweets) {
      tweet.retweets.map((data) => {
        if (!data) {
          return;
        }

        if (data.toString() === session?.id) {
          setRetweets(true);
        }
      });
    } else {
      tweet.tweetId.retweets.map((data: Tweet) => {
        if (!data) {
          return;
        }

        if (data.toString() === session?.id) {
          setRetweets(true);
        }
      });
    }
  }, [session]);

  return (
    <S.Container>
      <S.Action>
        <MdOutlineModeComment color='#4F4F4F' size={20}/>
        <span>Comment</span>
      </S.Action>
      <S.Action onClick={handleRetweet}>
        <AiOutlineRetweet color={retweets ? '#27AE60' :'#4F4F4F'} size={20}/>
        <span style={retweets ? {color: '#27AE60'} : {}}>Retweet</span>
      </S.Action>
      <S.Action onClick={handleLike}>
        <IoMdHeartEmpty color={like ? '#EB5757' : '#4F4F4F'} size={20}/>
        <span style={like ? {color: '#EB5757'} : {}}>Like</span>
      </S.Action>
      <S.Action>
        <MdOutlineBookmarkBorder color='#4F4F4F' size={20}/>
        <span>Save</span>
      </S.Action>
    </S.Container>
  );
}
