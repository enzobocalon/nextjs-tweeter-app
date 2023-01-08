import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 1100px;

  display: flex;
  gap: 24px;
  margin: 0 auto;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Preview = styled.div`
  width: 100%;
  max-width: 388px;

  p {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #828282;
  }

  @media (max-width: 768px) {
   max-width: 100%;
  }
`;

export const PreviewContent = styled.div`
  position: relative;

  #banner {
    width: 100%;
    max-height: 60px;
    object-fit: cover;
  }
`;

export const ProfileData = styled.div`
  display: flex;
  gap: 8px;
  background-color: white;
  width: 100%;
  border-radius: 8px;
  position: relative;

  img {
    position: absolute;
    top: -24px;
    left: 16px;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    border: 2px solid white;
  }

  > div {
    width: 100%;
    margin-left: 86px;
    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: -0.035em;
      color: #333333;
    }

    p {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.035em;
      color: #828282;
      padding-bottom: 8px;
    }
  }
`;

export const Settings = styled.div`
  width: 100%;
  max-width: 688px;

  > div {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 8px;
  border-bottom: 2px solid #E0E0E0;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  input {
    border: 1px solid #E0E0E0;
    padding: 8px;
    border-radius: 4px;
    outline: none;
  }
`;
