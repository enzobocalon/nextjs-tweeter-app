import pfp from '../../assets/Profile_avatar_placeholder_large.png';
import { MdPersonAdd, MdPerson, MdEdit } from 'react-icons/md';
import Image from 'next/image';

import * as S from './styles';
import { StyledContainer } from '../../styles/global';
import Button from '../Button';
import { User } from '../../types/User';
import { Session } from 'next-auth';
import axios from 'axios';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
  profile: User,
  session: Session | null,
  isFollowing: boolean
}

export default function ProfileInfo({profile, session, isFollowing}: Props) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(profile);
  const handleFollow = async () => {
    setLoading(true);
    await axios.post('/api/social/follow', {
      action: 1,
      profileId: profile._id,
      userId: session?.id
    }).then(response => {
      if (response.data.isNew) {
        setFollowing(true);
        setLoading(false);
        setProfileData(prev => {
          const updatedData = {
            ...prev,
            followed: [
              ...prev.followed,
              session?.id
            ]
          };
          return updatedData;
        });
      } else {
        setFollowing(false);
        setLoading(false);
        setProfileData(prev => {
          const updatedData = {
            ...prev,
            followed: prev.followed.filter(user => user !== session?.id)
          };
          return updatedData;
        });
      }
    });
  };

  return (
    <S.Container>
      <StyledContainer>
        <S.ImageContainer>
          <Image src={pfp} width={150} height={150} alt='pfp' />
        </S.ImageContainer>

        <S.ProfileInformation>
          <S.ProfileInformationContent>
            <S.PIHeader>
              <S.PIHeaderLeft>
                <h2>{profileData.name}</h2>
                <div>
                  <p>{profileData.follows.length} <span>Following</span></p>
                  <p>{profileData.followed.length} <span>Followers</span></p>
                </div>
              </S.PIHeaderLeft>
            </S.PIHeader>
            <p>{profileData.bio}</p>
          </S.ProfileInformationContent>

          {
            profile.username === session?.username ? (
              <Button>
                <MdEdit />
                Edit
              </Button>
            ) : (
              <Button onClick={() => handleFollow()}>
                {
                  !following ? (
                    <>
                      {loading ? (
                        <ClipLoader size={12} color='#fff'/>
                      ) : (
                        <>
                          <MdPersonAdd />
                          Follow
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {
                        loading ? (
                          <ClipLoader size={12} color='#fff'/>
                        ) : (
                          <>
                            <MdPerson />
                            Following
                          </>
                        )
                      }
                    </>
                  )
                }
              </Button>
            )
          }


        </S.ProfileInformation>
      </StyledContainer>
    </S.Container>
  );
}
