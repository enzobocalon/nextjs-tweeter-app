import { User } from '../../types/User';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import * as S from './styles';
import Button from '../Button';
import { MdPerson, MdPersonAdd } from 'react-icons/md';

interface Props {
  userItem: User
}

export default function Account({userItem}: Props) {
  return (
    <>
      <S.Profile>
        <S.ProfileLeft>
          <img src={pfpPlaceholder.src} />
          <div>
            <a href={`/${userItem.username}`}>
              <p>{userItem.name}</p>
            </a>
            <span>{userItem.follows.length} followers</span>
          </div>
        </S.ProfileLeft>
        <Button>
          <MdPersonAdd />
          Follow
        </Button>
      </S.Profile>
      <S.Bio>
        <p>{userItem.bio}</p>
      </S.Bio>
    </>
  );
}
