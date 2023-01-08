import axios from 'axios';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import * as S from './styles';

import { MdOutlineModeComment, MdOutlineBookmarkBorder } from 'react-icons/md';
import { AiOutlineRetweet } from 'react-icons/ai';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Tweet } from '../../types/Tweet';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface Props {
  tweet: Tweet,
  setTweetData: Dispatch<SetStateAction<Tweet>>
  handleComments: () => void
  handleBookmark?: () => void
}

export default function TweetActions({tweet, setTweetData, handleComments, handleBookmark: handleBookmarkPage}: Props) {
  const [like, setLike] = useState(false);
  const [retweets, setRetweets] = useState(false);
  const [bookmarks, setBookmarks] = useState(false);
  const {data: session} = useSession();

  const handleLike = async () => {
    await axios.post('/api/social/tweet-status', {
      action: 1,
      tweetId: tweet.tweetId ? tweet.tweetId._id : tweet.repliesTo ? tweet.repliesTo._id : tweet._id,
      userId: session?.id
    }).then((response) => {
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
          } else if (prev.repliesTo) {
            const updatedData = {
              ...prev,
              repliesTo: {
                ...prev.repliesTo,
                likes: [
                  ...prev.repliesTo.likes,
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
              ]
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
                likes: prev.tweetId.likes.filter((data: string) => data !== session?.id)
              }
            };
            return updatedData;
          } else if (prev.repliesTo) {
            const updatedData = {
              ...prev,
              repliesTo: {
                ...prev.repliesTo,
                likes: prev.repliesTo.likes.filter(data => data !== session?.id)
              }
            };
            return updatedData;
          } else {
            const updatedData = {
              ...prev,
              likes: prev.likes.filter(data => data !== session?.id)
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
      tweetId: tweet.tweetId ? tweet.tweetId._id : tweet.repliesTo ? tweet.repliesTo._id : tweet._id,
      userId: session?.id
    }).then((response) => {
      if (response.data.isNew) {
        setRetweets(true);
        setTweetData(prev => {
          if (prev.tweetId) {
            const updatedData = {
              ...prev,
              tweetId: {
                ...prev.tweetId,
                retweets: [
                  ...prev.tweetId.retweets,
                  session?.id
                ]
              }
            };
            return updatedData;
          } else if (prev.repliesTo) {
            const updatedData = {
              ...prev,
              repliesTo: {
                ...prev.repliesTo,
                retweets: [
                  ...prev.repliesTo.retweets,
                  session?.id
                ]
              }
            };
            return updatedData;
          } else {
            const updatedData = {
              ...prev,
              retweets: [
                ...prev.retweets,
                session?.id
              ]
            };
            return updatedData;
          }
        });
      } else {
        setRetweets(false);
        setTweetData(prev => {
          if (prev.tweetId) {
            const updatedData = {
              ...prev,
              tweetId: {
                ...prev.tweetId,
                retweets: prev.tweetId.retweets.filter((data: string) => data !== session?.id)
              }
            };
            return updatedData;
          }  else if (prev.repliesTo) {
            const updatedData = {
              ...prev,
              repliesTo: {
                ...prev.repliesTo,
                retweets: prev.repliesTo.retweets.filter(data => data !== session?.id)
              }
            };
            return updatedData;
          }
          else {
            const updatedData = {
              ...prev,
              retweets: prev.retweets.filter(data => data !== session?.id)
            };
            return updatedData;
          }
        });
      }
    });
  };

  const handleBookmark = async () => {
    await axios.post('/api/social/tweet-status', {
      action: 3,
      userId: session?.id,
      tweetId: tweet.tweetId ? tweet.tweetId._id : tweet.repliesTo ? tweet.repliesTo._id : tweet._id,
    }).then((response => {
      if (response.data.isNew) {
        toast.success('Added to bookmarks');
        setBookmarks(true);
      } else {
        toast.success('Removed from bookmarks');
        setBookmarks(false);
      }
      handleBookmarkPage!();
    }));
  };

  useEffect(() => {
    (tweet.tweetId ? tweet.tweetId.likes : tweet.repliesTo ? tweet.repliesTo.likes : tweet.likes)
      .map((data: string) => {
        if (data === session?.id) {
          setLike(true);
        }
      });

    (tweet.tweetId ? tweet.tweetId.retweets : tweet.repliesTo ? tweet.repliesTo.retweets : tweet.retweets)
      .map((data: string) => {
        if (data === session?.id) {
          setRetweets(true);
        }
      });

    (tweet.tweetId ? tweet.tweetId.bookmarks : tweet.repliesTo ? tweet.repliesTo.bookmarks : tweet.bookmarks)
      .map((data: string) => {
        if (data === session?.id) {
          setBookmarks(true);
        }
      });
  }, [session, tweet]);

  return (
    <S.Container>
      <S.Action onClick={() => handleComments()}>
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
      <S.Action onClick={() => handleBookmark()}>
        <MdOutlineBookmarkBorder color={bookmarks ? '#2D9CDB': '#4F4F4F'} size={20}/>
        <span style={bookmarks ? {color: '#2D9CDB'} : {}}>Save</span>
      </S.Action>
    </S.Container>
  );
}
