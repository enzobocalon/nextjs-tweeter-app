import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-bottom: 1px solid #F2F2F2;
`;

export const TextAreaContent = styled.div`
  display: flex;
  align-items: center;
  padding: .5rem;

  background: #FAFAFA;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  width: 100%;

  font-family: 'Noto Sans';
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.035em;

  > svg {
    cursor: pointer;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  max-height: 60px;
  overflow-y: auto;
  outline: none;

  ::-webkit-scrollbar {
    display: none;
  }

`;
