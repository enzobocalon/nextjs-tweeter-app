import Image from 'next/image';
import Form from '../components/Form';
import * as S from '../styles/authentication';

import logo from '../assets/tweeter.svg';

export default function Login() {
  return (
    <S.Container>
      <S.Wrapper>
        <Image src={logo} width={120} height={60} alt='logo'/>
        <Form isRegister={false}/>
      </S.Wrapper>
    </S.Container>
  );
}
