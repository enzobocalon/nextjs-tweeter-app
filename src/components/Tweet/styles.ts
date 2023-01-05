import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  gap: 16px;

  > div {
    > p {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.035em;
      color: #333333;
    }

  > span {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.035em;
      color: #828282;
    }
  }
`;

export const TweetContent = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    flex: 1;
    margin-top: 18px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  > span {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.035em;
    color: #828282;
  }
`;
