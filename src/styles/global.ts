import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body, #__next {
    height: 100vh;
    width: 100%;
    background-color: #f2f2f3;
    font-size: 16px;
    font-family: 'Noto Sans', sans-serif;
    position: relative;
  }

  hr {
    border: 1px solid #E0E0E0;
    width: 100%;
    margin-block: 8px;
  }

  strong {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;

    letter-spacing: -0.035em;
  }

  img {
    border-radius: 8px;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const StyledContainer = styled.div`
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    padding: 1rem;
`;
