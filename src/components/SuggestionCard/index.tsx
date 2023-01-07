import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import imagePlaceholder from '../../assets/imageplaceholder.avif';
import Button from '../Button';

import { MdPerson, MdPersonAdd } from 'react-icons/md';
import { User } from '../../types/User';
import { ClipLoader } from 'react-spinners';

interface Props {
  suggestion: User
}

export default function SuggestionCard ({suggestion}: Props) {
  const [suggestionsData, setSuggestionsData] = useState(suggestion);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();

  const handleFollow = async () => {
    setLoading(true);
    await axios.post('/api/social/follow', {
      action: 1,
      profileId: suggestion._id,
      userId: session?.id
    }).then(response => {
      if (response.data.isNew) {
        setFollowing(true);
        setLoading(false);
        setSuggestionsData(prev => {
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
        setSuggestionsData(prev => {
          const updatedData = {
            ...prev,
            followed: prev.followed.filter(user => user.toString() !== session?.id)
          };
          return updatedData;
        });
      }
    });
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <Image src={pfpPlaceholder} width={40} height={40} alt='icon' />
          <div>
            <p>{suggestion.name}</p>
            <span>{suggestionsData.followed.length} followers</span>
          </div>
        </div>

        <Button style={{padding: 8, gap: 8}} onClick={handleFollow}>
          {
            loading ? (
              <ClipLoader size={12} color='#fff'/>
            ) : following ? (
              <>
                <MdPerson />
                Following
              </>
            ) : (
              <>
                <MdPersonAdd size={20}/>
                Follow
              </>
            )
          }
        </Button>
      </S.Header>

      <S.Content>
        <p>{suggestion.bio ? suggestion.bio : 'No bio provided'}</p>
        <Image src={suggestion.banner ? suggestion.banner : imagePlaceholder} alt='image' />
      </S.Content>

      <hr style={{marginTop: 24}}/>
    </S.Container>
  );
}
