import Image from 'next/image';
import { useState } from 'react';

import * as S from './styles';
import logo from '../../assets/tweeter.svg';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { MdOutlineKeyboardArrowDown, MdHome, MdBookmark, MdOutlineGroup, MdSettings, MdLogout } from 'react-icons/md';
import { IoMdCompass } from 'react-icons/io';

import { FaUserCircle } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: session} = useSession();

  return (
    <S.Container>
      <Image src={logo} width={120} height={30} alt='logo'/>

      <S.MenuContainer>
        <S.Menu>
          <span>Home</span>
          <MdHome color='#828282' size={20}/>
        </S.Menu>
        <S.Menu>
          <span>Explore</span>
          <IoMdCompass color='#828282' size={20}/>
        </S.Menu>
        <S.Menu>
          <span>Bookmarks</span>
          <MdBookmark color='#828282' size={20}/>
        </S.Menu>
      </S.MenuContainer>

      <S.ProfileContainer onClick={() => setIsModalOpen(prev => !prev)}>
        <Image src={pfpPlaceholder} width={32} height={32} alt='profile icon' />
        <span>{session?.user?.name}</span>
        <MdOutlineKeyboardArrowDown/>

        <S.Modal showing={isModalOpen} onClick={(e) => e.stopPropagation()}>
          <S.ModalItem>
            <FaUserCircle size={20} color='#4F4F4F'/>
            <span>My Profile</span>
          </S.ModalItem>
          <S.ModalItem>
            <MdOutlineGroup size={20} color='#4F4F4F'/>
            <span>Group Chat</span>
          </S.ModalItem>
          <S.ModalItem>
            <MdSettings size={20} color='#4F4F4F'/>
            <span>Settings</span>
          </S.ModalItem>
          <hr />
          <S.ModalItem onClick={() => signOut({callbackUrl: '/login'})}>
            <MdLogout size={20} color='#EB5757'/>
            <span style={{color: '#EB5757'}}>Logout</span>
          </S.ModalItem>
        </S.Modal>
      </S.ProfileContainer>
    </S.Container>
  );
}
