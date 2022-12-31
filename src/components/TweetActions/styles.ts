import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 8px;
  padding: .5rem;
  border-top: 2px solid #F2F2F2;
  border-bottom: 2px solid #F2F2F2;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  transition: all .3s ease;

  :hover {
    background-color: #f2f2f2;
    border-radius: 8px;
    transition: all .3s ease;
  }
`;
