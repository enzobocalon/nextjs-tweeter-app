import { useState } from 'react';
import * as S from './styles';

export default function ProfileTab() {
  const [active, setActive] = useState(0); // 0 => tweets, 1 => tweets and replies, 2 => media, 3 => likes
  return (
    <S.TabContainer>
      <S.TabItem active={active === 0 ? true : false} onClick={() => setActive(0)}>
          Tweets
      </S.TabItem>
      <S.TabItem active={active === 1 ? true : false} onClick={() => setActive(1)}>
          Tweets & replies
      </S.TabItem>
      <S.TabItem active={active === 2 ? true : false} onClick={() => setActive(2)}>
          Media
      </S.TabItem>
      <S.TabItem active={active === 3 ? true : false} onClick={() => setActive(3)}>
          Likes
      </S.TabItem>
    </S.TabContainer>
  );
}
