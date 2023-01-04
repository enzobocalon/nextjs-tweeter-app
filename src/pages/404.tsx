import Header from '../components/Header';

import * as S from '../styles/404';

export default function NotFound() {
  return (
    <>
      <Header />
      <S.Container>
        <h3>404</h3>
        <span>| Content not found</span>
      </S.Container>
    </>
  );
}
