/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Header from '../components/Header';
import { StyledContainer } from '../styles/global';

import imagePlaceholder from '../assets/imageplaceholder.avif';
import pfpPlaceholder from '../assets/Profile_avatar_placeholder_large.png';

import * as S from '../styles/settings';
import Button from '../components/Button';
import { useState, useRef, useEffect } from 'react';
import { MdDone, MdUpload } from 'react-icons/md';
import { User } from '../types/User';
import { toast } from 'react-toastify';

interface Props {
  user: User
}

export default function Settings({user}: Props) {
  const [editing, setEditing] = useState(false);
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [uploadBanner, setUploadBanner] = useState(false);

  const name = useRef<HTMLInputElement | null>(null);
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const avatar = useRef<HTMLInputElement | null>(null);
  const banner = useRef<HTMLInputElement | null>(null);
  const bio = useRef<HTMLInputElement | null>(null);

  const {data: session} = useSession();

  const handleSubmit = async () => {
    if (!session) {
      return;
    }

    const formData = new FormData();
    if (name.current?.value) {
      formData.append('name', name.current.value);
    }

    if (username.current?.value) {
      formData.append('username', username.current.value);
    }

    if (password.current?.value) {
      formData.append('password', password.current.value);
    }

    if (bio.current?.value) {
      formData.append('bio', bio.current.value);
    }

    if (avatar.current?.files) {
      if (avatar.current.files[0]) {
        formData.append('avatar', avatar.current.files[0]);
        formData.append('isAvatar', 'true');
      } else {
        formData.append('isAvatar', 'false');
      }
    }

    if (banner.current?.files) {
      if (banner.current.files[0]) {
        formData.append('banner', banner.current.files[0]);
        formData.append('isBanner', 'true');
      } else {
        formData.append('isBanner', 'false');
      }
    }

    formData.append('userId', session.id);

    await axios.post('/api/social/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      toast.success('Profile updated.');
      window.location.reload();
    });
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Preview>
          <StyledContainer>
            <strong>Your Profile</strong>
            <p>Preview</p>
            <hr />
            <S.PreviewContent>
              <img src={user.banner ? `/uploads/${user.banner}` : imagePlaceholder.src} id='banner'/>

              <S.ProfileData>
                <img src={user.avatar ? `/uploads/${user.avatar}` : pfpPlaceholder.src} />
                <div>
                  <span>{user.name}</span>
                  <p>{user.bio}</p>
                </div>
              </S.ProfileData>
            </S.PreviewContent>
          </StyledContainer>
        </S.Preview>

        <S.Settings>
          <StyledContainer>
            <div>
              <strong>Customize your profile</strong>
              <Button style={{paddingBlock: 8}} onClick={() => setEditing(prev => !prev)}>Edit</Button>
            </div>
            <hr style={{marginBottom: 0}}/>
            <S.Data>
              <span>Name</span>
              {
                editing ? (
                  <input ref={name} placeholder='Your updated name'/>
                ) : (
                  <p>{user.name}</p>
                )
              }
            </S.Data>
            <S.Data>
              <span>Username</span>
              {
                editing ? (
                  <input ref={username} placeholder='Your updated username'/>
                ) : (
                  <p>{user.username}</p>
                )
              }
            </S.Data>
            <S.Data>
              <span>Email</span>
              <p>{user.email}</p>
            </S.Data>
            <S.Data>
              <span>Password</span>
              {
                editing ? (
                  <input ref={password} type={'password'} placeholder='Your updated password'/>
                ) : (
                  <p>*******</p>
                )
              }
            </S.Data>
            <S.Data>
              <span>Bio</span>
              {
                editing ? (
                  <input ref={bio} placeholder='Your updated bio'/>
                ) : (
                  <p>{user.bio}</p>
                )
              }
            </S.Data>

            {
              editing && (
                <>
                  <S.Data>
                    <span>Avatar</span>
                    <input type='file' hidden ref={avatar} onChange={() => setUploadAvatar(true)}/>

                    {
                      uploadAvatar ? (
                        <div>
                          <MdDone />
                          <span>Uploaded</span>
                        </div>
                      ) : (
                        <>
                          <div onClick={() => avatar.current?.click()}>
                            <MdUpload />
                            <span>Upload file</span>
                          </div>
                        </>
                      )
                    }
                  </S.Data>
                  <S.Data>
                    <span>Banner</span>
                    <input type='file' hidden ref={banner} onChange={() => setUploadBanner(true)}/>

                    {
                      uploadBanner ? (
                        <div>
                          <MdDone />
                          <span>Uploaded</span>
                        </div>
                      ) : (
                        <>
                          <div onClick={() => banner.current?.click()}>
                            <MdUpload />
                            <span>Upload file</span>
                          </div>
                        </>
                      )
                    }
                  </S.Data>

                  <Button style={{width: '100%', marginTop: 16}} onClick={handleSubmit}>Save</Button>
                </>
              )
            }
          </StyledContainer>
        </S.Settings>
      </S.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, {Location: '/login'});
    context.res.end();
    return {
      props: {}
    };
  }

  const user = await axios.get('http://localhost:3000/api/social/profile-data', {
    params: {
      username: session.username,
      action: 0
    }
  });

  return {
    props: {
      session,
      user: user.data[0]
    }
  };
};
