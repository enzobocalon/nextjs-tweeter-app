import Image from 'next/image';
import { useState } from 'react';

import * as S from './styles';
import logo from '../../assets/tweeter.svg';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { MdOutlineKeyboardArrowDown, MdHome, MdBookmark, MdOutlineGroup, MdSettings, MdLogout } from 'react-icons/md';
import { IoMdCompass } from 'react-icons/io';

import { FaUserCircle } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '../Button';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: session} = useSession();

  return (
    <S.Container>
      <Image src={logo} width={120} height={30} alt='logo'/>

      <S.MenuContainer>
        <Link href={'/'}>
          <S.Menu>
            <span>Home</span>
            <MdHome color='#828282' size={20}/>
          </S.Menu>
        </Link>
        <S.Menu>
          <span>Explore</span>
          <IoMdCompass color='#828282' size={20}/>
        </S.Menu>
        <Link href={'/bookmarks'}>
          <S.Menu>
            <span>Bookmarks</span>
            <MdBookmark color='#828282' size={20}/>
          </S.Menu>
        </Link>
      </S.MenuContainer>

      <S.ProfileContainer onClick={() => setIsModalOpen(prev => !prev)}>
        {
          session ? (
            <>
              <img src={session.avatar ? `/uploads/${session.avatar}` : pfpPlaceholder.src} width={32} height={32} alt='profile icon' />
              <span>{session?.user?.name}</span>
              <MdOutlineKeyboardArrowDown/>

              <S.Modal showing={isModalOpen} onClick={(e) => e.stopPropagation()}>
                <Link href={`/${session?.username}`}>
                  <S.ModalItem>
                    <FaUserCircle size={20} color='#4F4F4F'/>
                    <span>My Profile</span>
                  </S.ModalItem>
                </Link>
                <S.ModalItem>
                  <MdOutlineGroup size={20} color='#4F4F4F'/>
                  <span>Group Chat</span>
                </S.ModalItem>
                <Link href={'/settings'}>
                  <S.ModalItem>
                    <MdSettings size={20} color='#4F4F4F'/>
                    <span>Settings</span>
                  </S.ModalItem>
                </Link>
                <hr />
                <S.ModalItem onClick={() => signOut({callbackUrl: '/login'})}>
                  <MdLogout size={20} color='#EB5757'/>
                  <span style={{color: '#EB5757'}}>Logout</span>
                </S.ModalItem>
              </S.Modal>
            </>
          ) : (
            <>
              <Link href={'/login'}>
                <Button>Login</Button>
              </Link>
              <Link href={'/register'}>
                <Button style={{background: 'white', color: '#2f80ed', border: '1px solid #f2f2f2'}}>Register</Button>
              </Link>
            </>
          )
        }
      </S.ProfileContainer>
    </S.Container>
  );
}
