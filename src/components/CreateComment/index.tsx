import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
import { MdImage } from 'react-icons/md';

export default function CreateComment() {
  return (
    <S.Container>
      <Image src={pfpPlaceholder} width={40} height={40} alt='pfp' />
      <S.TextAreaContent>
        <S.TextArea contentEditable="true">Tweet your reply</S.TextArea>
        <MdImage color='#BDBDBD' size={20}/>
      </S.TextAreaContent>
    </S.Container>
  );
}
