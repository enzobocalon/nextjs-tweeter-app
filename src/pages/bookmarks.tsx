import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import Header from '../components/Header';
import Tweet from '../components/Tweet';
import { Tweet as ITweet} from '../types/Tweet';

import * as S from '../styles/bookmark';

interface Props {
  tweets: ITweet[]
}

export default function Bookmarks({tweets: tweetSSR}: Props) {
  const [tweets, setTweets] = useState(tweetSSR);
  return (
    <S.Container>
      <Header />
      <S.Content>
        {
          tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} setTweets={setTweets} isBookMarkPage={true}/>
          ))
        }
      </S.Content>
    </S.Container>
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

  const tweets = await axios.get('http://localhost:3000/api/social/bookmarks', {
    params: {
      userId: session.id
    }
  });

  return {
    props: {
      tweets: tweets.data
    }
  };
};
