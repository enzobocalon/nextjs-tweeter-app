import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';

import * as S from './styles';
import Button from '../Button';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { MdImage, MdGroup, MdClose } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';
import { Session } from 'next-auth/core/types';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { StyledContainer } from '../../styles/global';
import { Tweet } from '../../types/Tweet';

interface Props {
  session: Session | null
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

export default function CreateTweet ({session, setTweets}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publicContent, setPublicContent] = useState(true);
  const content = useRef<HTMLTextAreaElement | null>(null);
  const uploadFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handlePrivacy = (isPublic: boolean) => {
    setPublicContent(isPublic);
    setIsModalOpen(false);
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
    formData.append('privacy', publicContent.toString());

    await axios.post('/api/social/create-tweet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      setTweets(prev => {
        const updatedData = [
          response.data,
          ...prev
        ];
        return updatedData;
      });

      if (content.current) {
        content.current.value = '';
      }

      if (image) {
        setImage(null);
      }
      toast.success('Tweet created');
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
          {
            image && (
              <S.ImagePreview>
                <img src={image} alt='pfp' />
                <MdClose color='white' size={20} onClick={() => setImage(null)}/>
              </S.ImagePreview>
            )
          }

          <S.Footer>
            <S.LeftFooter>
              <S.FooterItem onClick={() => uploadFile.current?.click()}>
                <MdImage color='#2f80ed' />
                <input
                  type={'file'}
                  accept='image/*'
                  hidden
                  ref={uploadFile}
                  onChange={() => setImage(URL.createObjectURL(uploadFile.current?.files![0] as Blob))}/>
              </S.FooterItem>
              <div>
                <S.FooterItem onClick={() => setIsModalOpen(prev => !prev)}>
                  {
                    publicContent ? (
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

                    <S.ModalItem onClick={() => handlePrivacy(true)}>
                      <IoMdGlobe size={20}/>
                      <span>Everyone</span>
                    </S.ModalItem>
                    <S.ModalItem onClick={() => handlePrivacy(false)}>
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
