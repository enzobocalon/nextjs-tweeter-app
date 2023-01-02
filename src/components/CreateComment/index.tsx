import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
import { MdImage } from 'react-icons/md';

import { MutableRefObject, useState } from 'react';

interface Props {
  refTextarea: MutableRefObject<HTMLTextAreaElement | null>
}

export default function CreateComment({refTextarea}: Props) {
  return (
    <S.Container>
      <Image src={pfpPlaceholder} width={40} height={40} alt='pfp' />
      <S.TextAreaContent>
        <S.TextArea placeholder='Tweet your reply' ref={refTextarea}/>
        <MdImage color='#BDBDBD' size={20}/>
      </S.TextAreaContent>
    </S.Container>
  );
}
