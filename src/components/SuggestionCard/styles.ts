import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 8px;

    > div {
      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.035em;
        color: #000000;
      }
      span {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.035em;
        color: #828282;
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: .5rem;
  display: flex;
  flex-direction: column;

  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.035em;
    color: #828282;
  }

  > img {
    max-width: 100%;
    max-height: 64px;
    margin-top: 1rem;
    object-fit: cover;
  }
`;
