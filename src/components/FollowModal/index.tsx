import { StyledContainer } from '../../styles/global';

import { User } from '../../types/User';
import Account from '../Account';

interface Props {
  profile: User
  isFollower: boolean
}

export default function FollowModal({profile, isFollower}: Props) {
  return (
    <StyledContainer onClick={(e) => e.stopPropagation()}>
      <strong>{profile.name} {
        isFollower ? 'is followed by' : 'is following'
      }</strong>
      <hr style={{marginBottom: 16}}/>

      {
        isFollower ?
          profile.followed.map((userItem) => (
            <Account userItem={userItem} key={userItem._id}/>
          ))
          : profile.follows.map((userItem) => (
            <Account userItem={userItem} key={userItem._id}/>
          ))
      }
    </StyledContainer>
  );
}
