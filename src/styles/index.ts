import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: calc(100vh - 73px);
  padding: 1.5rem .5rem;
  margin-inline: auto;

  display: flex;
  gap: 25px;

  @media (max-width: 768px) {
    max-height: calc(100vh - 73px - 71px);
    overflow-y: auto;
    flex-direction: column;
  }
`;

export const MainContent = styled.section`
  width: 100%;
  max-width: 757px;
  flex: 1;
`;

export const AsideContent = styled.aside`
  width: 100%;
  max-width: 317px;
  flex: 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
