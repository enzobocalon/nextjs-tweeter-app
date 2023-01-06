import { getSession, useSession } from 'next-auth/react';
import CreateTweet from '../components/CreateTweet';
import Header from '../components/Header';
import Suggestion from '../components/Suggestion';
import Trending from '../components/Trending';
import Tweet from '../components/Tweet';
import * as S from '../styles/index';
import { GetServerSideProps } from 'next/types';
import axios from 'axios';
import { Tweet as ITweet } from '../types/Tweet';
import { User } from '../types/User';
import { useState } from 'react';

interface Props {
  tweets: ITweet[]
  suggestions: User[]
}

export default function Home({tweets: tweetsSSR, suggestions}: Props) {
  const {data: session} = useSession();
  const [tweets, setTweets] = useState(tweetsSSR);
  return (
    <>
      <Header />
      <S.Container>
        <S.MainContent>
          <CreateTweet session={session} setTweets={setTweets}/>
          {
            tweets.map(tweet => (
              <Tweet key={tweet._id} tweet={tweet.tweetId ? tweet.tweetId : tweet} profile={tweet.userId} isRetweet={tweet.tweetId ? true : false} setTweets={setTweets}/>
            ))
          }

        </S.MainContent>
        <S.AsideContent>
          <Trending />
          <Suggestion suggestions={suggestions}/>
        </S.AsideContent>
      </S.Container>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, {Location: '/login'});
    context.res.end();
    return {
      props: {}
    };
  }

  const feed = await axios.get('http://localhost:3000/api/social/timeline', {
    params: {
      userId: session.id
    }
  });

  return {
    props: {
      session,
      tweets: feed.data[0],
      suggestions: feed.data[1]
    }
  };
};
