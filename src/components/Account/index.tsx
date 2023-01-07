import { User } from '../../types/User';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import * as S from './styles';
import Button from '../Button';
import { MdPerson, MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Props {
  userItem: User
  user: User[]
}

export default function Account({userItem, user}: Props) {
  const [userData, setUserData] = useState(userItem);
  const [isFollowing, setIsFollowing] = useState(false);
  const {data: session} = useSession();

  const handleFollow = async () => {
    await axios.post('/api/social/follow', {
      action: 1,
      profileId: userData._id,
      userId: session?.id
    }).then(response => {
      if (response.data.isNew) {
        setIsFollowing(true);
        setUserData(prev => {
          const updatedData = {
            ...prev,
            followed: [
              ...prev.followed,
              user[0]._id as unknown as User
            ]
          };
          return updatedData;
        });
      } else {
        setIsFollowing(false);
        setUserData(prev => {
          const updatedData = {
            ...prev,
            followed: prev.followed.filter(user => user.toString() !== session?.id)
          };
          return updatedData;
        });
      }
    });
  };

  useEffect(() => {
    user[0].follows.map((currentUser) => {
      if (currentUser._id === userData._id) {
        setIsFollowing(true);
      }
    });
  }, []);
  return (
    <>
      <S.Profile>
        <S.ProfileLeft>
          <img src={pfpPlaceholder.src} />
          <div>
            <a href={`/${userData.username}`}>
              <p>{userData.name}</p>
            </a>
            <span>{userData.followed.length} followers</span>
          </div>
        </S.ProfileLeft>
        {
          userItem._id !== session?.id && isFollowing ? (
            <Button onClick={handleFollow}>
              <MdPerson />
                Following
            </Button>
          ) : (
            <Button onClick={handleFollow}>
              <MdPersonAdd />
                Follow
            </Button>
          )
        }
      </S.Profile>
      <S.Bio>
        <p>{userData.bio}</p>
      </S.Bio>
    </>
  );
}
