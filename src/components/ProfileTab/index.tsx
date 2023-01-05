import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { Tweet as ITweet } from '../../types/Tweet';
import { User } from '../../types/User';
import * as S from './styles';

interface Props {
  setTweets: Dispatch<SetStateAction<[User, ITweet[]]>>
}

export default function ProfileTab({setTweets}: Props) {
  const [active, setActive] = useState(0); // 0 => tweets, 1 => tweets and replies, 2 => media, 3 => likes
  const router = useRouter();

  const handleTab = async (item: number) => {
    setActive(item);

    const tweets = await axios.get('http://localhost:3000/api/social/profile-data', {
      params: {
        username: router.query.username,
        action: item
      }
    });

    const mergedData = tweets.data.length > 2 ?
      [tweets.data[0], tweets.data[0].tweets.concat(tweets.data[1]).concat(tweets.data[2])] :
      [tweets.data[0], tweets?.data[0].tweets.concat(tweets.data[1])]; // [0] => user, [1] => tweets + retweets
    const sortedData: [User, ITweet[]] = [
      mergedData[0],
      mergedData[1].sort((a: ITweet, b: ITweet) => {
        return new Date (b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
      })
    ];
    setTweets(sortedData);
  };

  return (
    <S.TabContainer>
      <S.TabItem active={active === 0 ? true : false} onClick={() => handleTab(0)}>
          Tweets
      </S.TabItem>
      <S.TabItem active={active === 1 ? true : false} onClick={() => handleTab(1)}>
          Tweets & replies
      </S.TabItem>
      <S.TabItem active={active === 2 ? true : false} onClick={() => handleTab(2)}>
          Media
      </S.TabItem>
      <S.TabItem active={active === 3 ? true : false} onClick={() => handleTab(3)}>
          Likes
      </S.TabItem>
    </S.TabContainer>
  );
}
