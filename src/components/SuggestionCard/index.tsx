import Image from 'next/image';
import * as S from './styles';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import imagePlaceholder from '../../assets/imageplaceholder.avif';
import Button from '../Button';

import { MdPersonAdd } from 'react-icons/md';

export default function SuggestionCard () {
  return (
    <S.Container>
      <S.Header>
        <div>
          <Image src={pfpPlaceholder} width={40} height={40} alt='icon' />
          <div>
            <p>Mikael Stanley</p>
            <span>230k followers</span>
          </div>
        </div>

        <Button style={{padding: 8, gap: 8}}>
          <MdPersonAdd size={20}/>
          Follow
        </Button>
      </S.Header>

      <S.Content>
        <p>Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰</p>
        <Image src={imagePlaceholder} alt='image' />
      </S.Content>

      <hr style={{marginTop: 24}}/>
    </S.Container>
  );
}
