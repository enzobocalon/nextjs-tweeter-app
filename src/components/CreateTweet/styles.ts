import styled from 'styled-components';

interface Props {
  showing: boolean
}

export const ContentArea = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
`;

export const TextAreaContent = styled.div`
  width: 100%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 48px;
  resize: none;
  border: none;
  outline: none;

  font-family: 'Noto Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.035em;

  &::placeholder {
    color: #bdbdbd;
  }

`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > div:last-of-type {
    position: relative;
  }
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;

  > span {
      color: #2f80ed;
    }

    :hover {
      background-color: #f2f2f2;
      border-radius: 8px;
    }
`;

export const Modal = styled.div<Props>`
  width: 235px;
  position: absolute;
  top: 56px;

  opacity: ${({showing}) => showing ? '1' : '0'};
  pointer-events: ${({showing}) => showing ? 'all' : 'none'};
  transition: all .3s ease;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #828282;
  }
`;

export const ModalItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: .5rem;
  gap: .5rem;
  padding: .5rem;
  cursor: pointer;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #4F4F4F;
  }

  :hover {
    background: #F2F2F2;
    border-radius: 8px;
  }
`;
