import Image from 'next/image';
import { StyledContainer } from '../../styles/global';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import * as S from './styles';
import TweetActions from '../TweetActions';
import TweetStats from '../TweetStats';
import CreateComment from '../CreateComment';
import Comments from '../Comments';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Tweet as ITweet } from '../../types/Tweet';
import { Session } from 'next-auth';
import { useState } from 'react';

interface Props {
  tweet: ITweet,
  session: Session | null
  name?: string,
  isRetweet?: boolean
}

export default function Tweet({tweet, session, name, isRetweet}: Props) {
  const [tweetData, setTweetData] = useState<ITweet>(tweet);
  return (
    <>
      {
        isRetweet && (
          <S.RetweetedContainer>
            <AiOutlineRetweet color='#828282'/>
            <span>{tweetData.userId.name || name} Retweeted</span>
          </S.RetweetedContainer>
        )
      }
      <StyledContainer style={{marginBottom: 24}}>
        <S.Header>
          <Image src={pfpPlaceholder} width={40} height={40} alt='profile icon' />

          <div>
            <p>{tweetData.userId.name || name}</p>
            <span>24 August at 20:43</span>
          </div>
        </S.Header>

        <S.TweetContent>
          <p>{tweetData.content || tweetData.tweetId.content}</p>
          {
            tweetData.media && tweetData.media[0] !== '' ? <img src={`./uploads/${tweetData.media[0]}`} alt='image'/> : null
          }
        </S.TweetContent>

        <TweetStats
          likes={tweetData.likes || tweetData.tweetId.likes}
          replies={tweetData.replies || tweetData.tweetId.replies}
          retweets={tweetData.retweets || tweetData.tweetId.retweets}/>
        <TweetActions tweet={tweetData} session={session} setTweetData={setTweetData}/>
        {/* <CreateComment /> */}
        <Comments />
      </StyledContainer>
    </>
  );
}
