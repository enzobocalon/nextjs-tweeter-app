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
import { User } from '../types/User';

interface Props {
  tweets: [
    User,
    ITweet[]
  ]
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
              <>
                {
                  tweets[1].map((tweet: ITweet) => (
                    <Tweet key={tweet._id} tweet={tweet} session={session} name={tweets[0].name} isRetweet={tweet.tweetId ? true : false}/>
                  ))
                }
              </>
            </S.TweetsContainer>
          </S.Feed>
        </S.Content>
      </S.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // Must be deleted, not logged users SHOULD BE ABLE to see profiles
  if (!session) {
    context.res.writeHead(302, {Location: '/login'});
    context.res.end();
    return {
      props: {}
    };
  }

  const {params} = context;

  const tweets = await axios.get('http://localhost:3000/api/social/profile-data', {
    params: {
      username: params?.username
    }
  });

  // Try to merge and sort both arrays

  const mergedData = [tweets.data[0], tweets.data[0].tweets.concat(tweets.data[1])];
  const sortedData = [
    mergedData[0],
    mergedData[1].sort((a: ITweet, b: ITweet) => {
      return new Date (b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    })
  ];

  return {
    props: {
      session,
      tweets: sortedData
    }
  };
};
