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

interface Props {
  tweets: ITweet[]
}

export default function Home({tweets}: Props) {
  const {data: session} = useSession();
  return (
    <>
      <Header />

      <S.Container>
        <S.MainContent>
          <CreateTweet session={session}/>
          {
            tweets.map(tweet => (
              <Tweet key={tweet._id} tweet={tweet} session={session}/>
            ))
          }

        </S.MainContent>
        <S.AsideContent>
          <Trending />
          <Suggestion />
        </S.AsideContent>
      </S.Container>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log('Session:', session);

  if (!session) {
    context.res.writeHead(302, {Location: '/login'});
    context.res.end();
    return {
      props: {}
    };
  }

  const tweets = await axios.get('http://localhost:3000/api/social/timeline', {
    params: {
      userId: session.id
    }
  });

  console.log(tweets.data);

  return {
    props: {
      session,
      tweets: tweets.data
    }
  };
};
