import * as S from './styles';
import { StyledContainer } from '../../styles/global';
import Image from 'next/image';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { MdImage, MdGroup } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';
import Button from '../Button';
import { Session } from 'next-auth/core/types';
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  session: Session | null
}

export default function CreateTweet ({session}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privacy, setPrivacy] = useState(0); // 0 => public, 1 => private
  const content = useRef<HTMLTextAreaElement | null>(null);
  const uploadFile = useRef<HTMLInputElement | null>(null);

  const handlePrivacy = (value: number) => {
    if (value) {
      setPrivacy(1);
      setIsModalOpen(false);
    } else {
      setPrivacy(0);
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (!session) {
      toast.error('Cannot submit Tweet - User not logged in!');
      return null;
    }

    if (uploadFile.current?.files) {
      formData.append('media', uploadFile.current?.files[0]);
    }

    if (content.current?.value) {
      formData.append('content', content.current.value);
    }

    formData.append('userId', session.id);
    formData.append('privacy', privacy.toString());

    await axios.post('/api/social/create-tweet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

  };
  return (
    <StyledContainer style={{marginBottom: 24}}>
      <strong>Tweet Something</strong>
      <hr />

      <S.ContentArea>
        <Image src={pfpPlaceholder} alt='pfp' width={40} height={40}/>
        <S.TextAreaContent>
          <S.TextArea placeholder="What's happening?" ref={content}/>

          <S.Footer>
            <S.LeftFooter>
              <S.FooterItem onClick={() => uploadFile.current?.click()}>
                <MdImage color='#2f80ed' />
                <input type={'file'} hidden ref={uploadFile}/>
              </S.FooterItem>
              <div>
                <S.FooterItem onClick={() => setIsModalOpen(prev => !prev)}>
                  {
                    privacy === 0 ? (
                      <>
                        <IoMdGlobe color='#2f80ed'/>
                        <span>Everyone can reply</span>
                      </>
                    ) : (
                      <>
                        <MdGroup color='#2f80ed'/>
                        <span>People you follow</span>
                      </>
                    )
                  }
                </S.FooterItem>

                <S.Modal showing={isModalOpen}>
                  <StyledContainer>
                    <strong>Who can reply?</strong>
                    <p>Choose who can reply to this Tweet</p>

                    <S.ModalItem onClick={() => handlePrivacy(0)}>
                      <IoMdGlobe size={20}/>
                      <span>Everyone</span>
                    </S.ModalItem>
                    <S.ModalItem onClick={() => handlePrivacy(1)}>
                      <MdGroup size={20}/>
                      <span>People you follow</span>
                    </S.ModalItem>
                  </StyledContainer>
                </S.Modal>
              </div>
            </S.LeftFooter>

            <Button onClick={handleSubmit}>Tweet</Button>
          </S.Footer>
        </S.TextAreaContent>
      </S.ContentArea>
    </StyledContainer>
  );
}
