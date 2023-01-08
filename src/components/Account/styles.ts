import styled from 'styled-components';

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    max-width: 40px;
    max-height: 40px;
   }

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
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #828282;
   }
`;

export const Bio = styled.div`
  margin-block: 1rem;
  padding-bottom: 1rem;

  border-bottom: 2px solid #E0E0E0;
  p {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.035em;
    color: #828282;
  }
`;
