import * as S from './styles';

export default function ProfileTab() {
  return (
    <S.TabContainer>
      <S.TabItem>
          Tweets
      </S.TabItem>
      <S.TabItem>
          Tweets & replies
      </S.TabItem>
      <S.TabItem>
          Media
      </S.TabItem>
      <S.TabItem>
          Likes
      </S.TabItem>
    </S.TabContainer>
  );
}
