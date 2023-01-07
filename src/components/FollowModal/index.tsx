import { StyledContainer } from '../../styles/global';

import { User } from '../../types/User';
import Account from '../Account';

interface Props {
  profile: User
  isFollower: boolean
  user: User[]
}

export default function FollowModal({profile, isFollower, user}: Props) {
  return (
    <StyledContainer onClick={(e) => e.stopPropagation()}>
      <strong>{profile.name} {
        isFollower ? 'is followed by' : 'is following'
      }</strong>
      <hr style={{marginBottom: 16}}/>

      {
        isFollower ?
          profile.followed.map((userItem) => (
            <Account userItem={userItem} key={userItem._id} user={user}/>
          ))
          : profile.follows.map((userItem) => (
            <Account userItem={userItem} key={userItem._id} user={user}/>
          ))
      }
    </StyledContainer>
  );
}
