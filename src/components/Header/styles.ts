import styled from 'styled-components';

interface Props {
  showing: boolean
}

export const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background-color: white;

  @media (max-width: 768px) {
    padding: 1.5rem 4rem;
  }
`;

export const Logo = styled.div`
`;

export const MenuContainer = styled.div`
  display: flex;
  gap: 80px;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: white;
  }
`;

export const Menu = styled.div`
  cursor: pointer;
  border-bottom: 3px solid transparent;
  padding: 1.5rem 0;
  transition: all .3s ease;

  > svg {
    display: none;
  }

  &:hover {
    border-bottom: 3px solid #2F80ED;
    border-radius: 8px 8px 0px 0px;
    transition: all .3s ease;
  }

  @media (max-width: 768px) {
    padding-inline: 2rem;

    > svg {
      display: block;
    }

    > span {
      display: none;
    }
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;

  > span {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
  }

  @media (max-width: 768px) {
    > span {
      display: none;
    }

    > svg {
      display: none;
    }
  }
`;

export const Modal = styled.div<Props>`
  opacity: ${({showing}) => showing ? '1' : '0'};
  pointer-events: ${({showing}) => showing ? 'all' : 'none'};
  position: absolute;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  width: 200px;
  top: 60px;
  right: 0;
  padding: 1rem;

  transition: all .3s ease;
`;

export const ModalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: .75rem 1rem;
  margin-block: 4px;
  transition: all .3s ease;

  > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #4F4F4F;
  }

  :hover {
    background: #F2F2F2;
    border-radius: 8px;
    transition: all .3s ease;
  }
`;
