import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px 0;
  padding: 8px 4px;
  cursor: pointer;
  transition: all .3s ease;

  :hover {
    background-color: #f2f2f2;
    border-radius: 8px;
    transition: all .3s ease;
  }

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
`;
