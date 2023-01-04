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
  ],
  isFollowing: boolean;
}

export default function Profile ({tweets, isFollowing}: Props) {
  const {data: session} = useSession();

  return (
    <>
      <Header />
      <S.Container>
        <Image src={imagePlaceholder} alt='banner' />

        <S.Content>
          <ProfileInfo profile={tweets[0]} session={session} isFollowing={isFollowing}/>
          <S.Feed>
            <ProfileTab />
            <S.TweetsContainer>
              <>
                {
                  tweets[1].map(tweet => (
                    <Tweet key={tweet._id} tweet={tweet} profile={tweets[0]} isRetweet={tweet.tweetId ? true : false} />
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

  const { params } = context;

  try {
    const tweets = await axios.get('http://localhost:3000/api/social/profile-data', {
      params: {
        username: params?.username
      }
    });

    const followingStatus = await axios.get('http://localhost:3000/api/social/follow', {
      params: {
        action: 1,
        username: params?.username,
        sessionId: session?.id
      }
    });

    const mergedData = [tweets.data[0], tweets?.data[0].tweets.concat(tweets.data[1])]; // [0] => user, [1] => tweets + retweets
    const sortedData = [
      mergedData[0],
      mergedData[1].sort((a: ITweet, b: ITweet) => {
        return new Date (b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
      })
    ];

    return {
      props: {
        tweets: sortedData,
        isFollowing: followingStatus.data.isFollowing,
        notFound: false
      }
    };
  } catch (error) {
    context.res.writeHead(302, {Location: '/404'});
    context.res.end();
    return {
      props: {}
    };
  }
};
