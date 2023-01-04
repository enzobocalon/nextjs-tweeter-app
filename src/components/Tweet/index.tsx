import { useState, useRef } from 'react';
import Image from 'next/image';

import * as S from './styles';
import TweetActions from '../TweetActions';
import TweetStats from '../TweetStats';
import CreateComment from '../CreateComment';
import Comments from '../Comments';

import { StyledContainer } from '../../styles/global';
import { AiOutlineRetweet } from 'react-icons/ai';

import { Tweet as ITweet } from '../../types/Tweet';
import { User } from '../../types/User';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

interface Props {
  tweet: ITweet,
  profile?: User
  isRetweet?: boolean
}

export default function Tweet({tweet, profile, isRetweet}: Props) {
  const [tweetData, setTweetData] = useState<ITweet>(tweet);
  const [replies, setReplies] = useState<ITweet[] | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  // criar estado para o tweet para quando o usuario criar um tweet ja aparecer no feed

  const handleComments = async () => {
    commentRef.current?.focus();
    setReplies(null);
    setCommentLoading(true);

    await axios.get('/api/social/reply', {
      params: {
        tweetId: tweet.tweetId ? tweet.tweetId._id : tweet._id
      }
    }).then(response => {
      setReplies(response.data);
      setCommentLoading(false);
    });

  };
  return (
    <>
      {
        isRetweet && (
          <S.RetweetedContainer>
            <AiOutlineRetweet color='#828282'/>
            <span>{profile?.name} Retweeted</span>
          </S.RetweetedContainer>
        )
      }
      <StyledContainer style={{marginBottom: 24}}>
        <S.Header>
          <Image src={pfpPlaceholder} width={40} height={40} alt='profile icon' />

          <div>
            <p>{tweetData.userId.name || tweetData.tweetId.userId.name}</p>
            <span>24 August at 20:43</span>
          </div>
        </S.Header>

        <S.TweetContent>
          <p>{tweetData.content || tweetData.tweetId.content}</p>
          {
            tweetData.media && tweetData.media[0] !== ''  ? <img src={`./uploads/${tweetData.media[0]}`} alt='image'/> : null
          }
        </S.TweetContent>

        <TweetStats
          likes={tweetData.likes || tweetData.tweetId.likes}
          replies={tweetData.replies || tweetData.tweetId.replies}
          retweets={tweetData.retweets || tweetData.tweetId.retweets}/>
        <TweetActions
          tweet={tweetData}
          setTweetData={setTweetData}
          handleComments={handleComments}/>
        <CreateComment
          refTextarea={commentRef}
          tweet={tweet}
          tweetId={tweet.tweetId ? tweet.tweetId._id : tweet._id}
          replies={replies}
          setReplies={setReplies}/>

        {
          !replies && !commentLoading ? tweet.tweetId ? tweet.tweetId.replies.length > 0 ? (
            <p
              style={{color: '#BDBDBD', marginTop: 4, cursor: 'pointer'}}
              onClick={() => handleComments()}>
              Show Replies
            </p>
          ) : null : tweet.replies.length > 0 ? (
            <p
              style={{color: '#BDBDBD', marginTop: 4, cursor: 'pointer'}}
              onClick={() => handleComments()}>
              Show Replies
            </p>
          ) : null : null
        }

        {
          commentLoading ? (
            <ClipLoader size={16} color='#2f80ed'/>
          ) : replies ? replies.map(reply => (
            <Comments key={reply._id} reply={reply} />
          )) : null
        }
      </StyledContainer>
    </>
  );
}
