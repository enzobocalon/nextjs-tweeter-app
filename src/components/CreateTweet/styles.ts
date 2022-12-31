import styled from 'styled-components';

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

  > * {
    padding: 4px;

    &:hover{
      background-color: #f2f2f2;
      border-radius: 8px;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    > span {
      color: #2f80ed;
    }
  }
`;
