import Image from 'next/image';
import { StyledContainer } from '../../styles/global';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import imagePlaceholder from '../../assets/imageplaceholder.avif';
import * as S from './styles';
import TweetActions from '../TweetActions';
import TweetStats from '../TweetStats';
import CreateComment from '../CreateComment';
import Comments from '../Comments';
import { Tweet as ITweet } from '../../types/Tweet';
import { Session } from 'next-auth';
import { useState } from 'react';

interface Props {
  tweet: ITweet,
  session: Session | null
}

export default function Tweet({tweet, session}: Props) {
  const [tweetData, setTweetData] = useState<ITweet>(tweet);

  return (
    <StyledContainer style={{marginTop: 24}}>
      <S.Header>
        <Image src={pfpPlaceholder} width={40} height={40} alt='profile icon' />

        <div>
          <p>{tweetData.userId.name}</p>
          <span>24 August at 20:43</span>
        </div>
      </S.Header>

      <S.TweetContent>
        <p>{tweetData.content}</p>
        {
          tweetData.media ? <Image src={imagePlaceholder} alt='image' /> : null
        }
      </S.TweetContent>

      <TweetStats likes={tweetData.likes} retweets={tweetData.retweets} replies={tweetData.replies} />
      <TweetActions tweet={tweetData} session={session} setTweetData={setTweetData}/>
      {/* <CreateComment /> */}
      <Comments />
    </StyledContainer>
  );
}
