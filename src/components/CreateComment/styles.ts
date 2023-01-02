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

export const TextArea = styled.textarea`
  width: 100%;
  max-height: 40px;
  overflow-y: auto;
  outline: none;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Noto Sans',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }

  &::placeholder {
    color: #bdbdbd;
  }

`;
