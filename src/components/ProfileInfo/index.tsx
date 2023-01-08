import pfp from '../../assets/Profile_avatar_placeholder_large.png';
import { MdPersonAdd, MdPerson, MdEdit } from 'react-icons/md';
import Image from 'next/image';

import * as S from './styles';
import { StyledContainer } from '../../styles/global';
import Button from '../Button';
import { User } from '../../types/User';
import { Session } from 'next-auth';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface Props {
  profile: User,
  session: Session | null,
  isFollowing: boolean
  setFollowModal: Dispatch<SetStateAction<boolean>>
  setIsFollowers: Dispatch<SetStateAction<boolean>>
}

export default function ProfileInfo({profile, session, isFollowing, setFollowModal, setIsFollowers}: Props) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(profile);

  const handleFollowModal = (item: boolean) => {
    setFollowModal(true);
    setIsFollowers(item);
  };

  const handleFollow = async () => {
    if (session) {
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
                session?.id as unknown as User
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
              followed: prev.followed.filter(user => user.toString() !== session?.id)
            };
            return updatedData;
          });
        }
      });
    } else {
      toast.error('You must sign in to follow a user');
      return;
    }
  };

  return (
    <S.Container>
      <StyledContainer>
        <S.ImageContainer>
          <img src={profile.avatar ? `/uploads/${profile.avatar}` : pfp.src} width={150} height={150} alt='pfp' />
        </S.ImageContainer>

        <S.ProfileInformation>
          <S.ProfileInformationContent>
            <S.PIHeader>
              <S.PIHeaderLeft>
                <h2>{profileData.name}</h2>
                <div>
                  <p onClick={() => handleFollowModal(false)}>{profileData.follows.length} <span>Following</span></p>
                  <p onClick={() => handleFollowModal(true)}>{profileData.followed.length} <span>Followers</span></p>
                </div>
              </S.PIHeaderLeft>
            </S.PIHeader>
            <p>{profileData.bio}</p>
          </S.ProfileInformationContent>

          {
            profile.username === session?.username ? (
              <Link href={'/settings'}>
                <Button>
                  <MdEdit />
                Edit
                </Button>
              </Link>
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
