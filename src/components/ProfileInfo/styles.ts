import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);

  > div { // Styled Container
    display: flex;
    min-height: 150px;
  }

  @media (max-width: 768px) {
    width: 95%;
    margin-inline: 1rem;
  }
`;

export const ImageContainer = styled.div`
  min-width: 175px;
  position: relative;
  > img {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    border: 4px solid white;
  }

  @media (max-width: 768px) {
    position: unset;
    min-width: auto;
    > img {
      left: 50%;
      top: -25%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const ProfileInformation = styled.div`
  display: flex;
  width: 100%;

  > button {
    max-height: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 2rem;
    align-items: center;

    > button {
      max-width: 120px;
    }
  }
`;

export const ProfileInformationContent = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;

    > p {
      margin-block: .5rem;
    }
  }
`;

export const PIHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const PIHeaderLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 12px;

    > p {
      cursor: pointer;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.035em;
      color: #333333;

      > span {
        font-weight: 500;
      }
    }
  }

  > h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.035em;
    color: #333333
  }
`;
