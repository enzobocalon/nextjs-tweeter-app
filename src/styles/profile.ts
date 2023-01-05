import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 73px);
  > img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 0;
  }

  @media (max-width: 768px) {
    max-height: calc(100vh - 80px - 73px);
    overflow-y: auto;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  position: relative;
`;

export const Feed = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;

  > * {
    flex: 1;
  }

  @media (max-width: 768px) {
    width: 95%;
    margin-inline: 1rem;
    flex-direction: column;
  }
`;

export const TweetsContainer = styled.div``;
