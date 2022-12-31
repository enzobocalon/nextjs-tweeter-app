import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import * as S from '../styles/profile';

import imagePlaceholder from '../assets/imageplaceholder.avif';
import ProfileInfo from '../components/ProfileInfo';
import ProfileTab from '../components/ProfileTab';
import Tweet from '../components/Tweet';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { Tweet as ITweet } from '../types/Tweet';

interface Props {
  tweets: ITweet[]
}

export default function Profile ({tweets}: Props) {
  const {data: session} = useSession();

  return (
    <>
      <Header />
      <S.Container>
        <Image src={imagePlaceholder} alt='banner' />

        <S.Content>
          <ProfileInfo />
          <S.Feed>
            <ProfileTab />
            <S.TweetsContainer>
              {
                tweets.map(tweet => (
                  <Tweet key={tweet._id} tweet={tweet} session={session}/>
                ))
              }
            </S.TweetsContainer>
          </S.Feed>
        </S.Content>
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
