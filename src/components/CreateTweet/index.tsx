import * as S from './styles';
import { StyledContainer } from '../../styles/global';
import Image from 'next/image';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { MdImage } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';
import Button from '../Button';
import { Session } from 'next-auth/core/types';
import { useRef } from 'react';
import axios from 'axios';

interface Props {
  session: Session | null
}

export default function CreateTweet ({session}: Props) {
  console.log(session);
  const content = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async () => {
    if (content.current) {
      if (content.current.value) {
        await axios.post('/api/social/create-tweet', {
          content: content.current.value,
          userId: session?.id,
          media: null
        });
      }
    }
  };
  return (
    <StyledContainer>
      <strong>Tweet Something</strong>
      <hr />

      <S.ContentArea>
        <Image src={pfpPlaceholder} alt='pfp' width={40} height={40}/>
        <S.TextAreaContent>
          <S.TextArea placeholder="What's happening?" ref={content}/>

          <S.Footer>
            <S.LeftFooter>
              <div>
                <MdImage color='#2f80ed'/>
              </div>
              <div>
                <IoMdGlobe color='#2f80ed'/>
                <span>Everyone can reply</span>
              </div>
            </S.LeftFooter>

            <Button onClick={handleSubmit}>Tweet</Button>
          </S.Footer>
        </S.TextAreaContent>
      </S.ContentArea>
    </StyledContainer>
  );
}
