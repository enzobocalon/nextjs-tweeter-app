import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 1rem;
  gap: 12px;

`;

export const CommentContent = styled.div`
  width: 100%;
`;

export const CommentContentContainer = styled.div`
  background: #FAFAFA;
  border-radius: 8px;
  padding: 1rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  div {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  svg {
      cursor: pointer;
  }

  div > span:first-of-type {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.035em;

    color: #000000;
  }

  div > span:last-of-type {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;

    color: #BDBDBD;
  }
`;

export const Comment = styled.div`
  margin-top: 8px;

  img {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    margin-top: 8px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const Action = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 2px;
  cursor: pointer;

  > span, svg {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #BDBDBD;
  }

  &:nth-of-type(2) {
    cursor: auto;
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
