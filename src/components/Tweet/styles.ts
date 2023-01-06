import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  position: relative;
   div {
    > p {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.035em;
      color: #333333;
    }

  > span {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.035em;
      color: #828282;
    }
  }

  > svg {
    cursor: pointer;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 16px;
`;

export const TweetContent = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    flex: 1;
    margin-top: 18px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  > span {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.035em;
    color: #828282;
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 100%;
  max-width: 300px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 5%);
  border-radius: 12px;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;

  :hover {
    background-color: #f2f2f2;
    border-radius: 8px;
  }
`;
