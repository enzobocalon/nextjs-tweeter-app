import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';

export default function Comments() {
  return (
    <S.Container>
      <Image src={pfpPlaceholder} width={40} height={40} alt='icon' />

      <S.CommentContent>

        <S.CommentContentContainer>
          <S.CommentHeader>
            <span>Waqar Bloom</span>
            <span>24 August at 20:43</span>
          </S.CommentHeader>
          <S.Comment>
            <p>I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person.</p>
          </S.Comment>
        </S.CommentContentContainer>
        <S.FooterContainer>
          <S.Action>
            <IoMdHeartEmpty size={18}/>
            <span>Likes</span>
          </S.Action>
          <S.Action>
            <span>·</span>
          </S.Action>
          <S.Action>
            <span>12k Likes</span>
          </S.Action>
        </S.FooterContainer>
      </S.CommentContent>
    </S.Container>
  );
}
