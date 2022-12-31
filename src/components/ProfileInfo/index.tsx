import pfp from '../../assets/Profile_avatar_placeholder_large.png';
import { MdPersonAdd } from 'react-icons/md';
import Image from 'next/image';

import * as S from './styles';
import { StyledContainer } from '../../styles/global';
import Button from '../Button';

export default function ProfileInfo() {
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
                <h2>Daniel Jensen</h2>
                <div>
                  <p>2,569 <span>Following</span></p>
                  <p>10.85k <span>Followers</span></p>
                </div>
              </S.PIHeaderLeft>
            </S.PIHeader>
            <p>Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰</p>
          </S.ProfileInformationContent>

          <Button>
            <MdPersonAdd />
              Follow
          </Button>


        </S.ProfileInformation>
      </StyledContainer>
    </S.Container>
  );
}
