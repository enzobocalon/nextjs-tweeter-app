import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: .9rem;

`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 1px .875rem;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: .8rem 0;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: 'Noto Sans', sans-serif;

  &::placeholder {
    color: #828282;
  }
`;

export const Errors = styled.span`
  color: #EB5757;
`;
