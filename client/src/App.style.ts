import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --backgroudColor: #FAFAFA;
    --borderColor: #DBDBDB;
    --textColorGray: #8e8e8e;
    --textColorDarkGray: #262626;
    --buttonLightBlue: #0095f6;
    --linkColor: #385185;
    --linkColorTwo: #00376b;
    --textErrorColor: #ed4956;
    --borderDarkColor: #A8A8A8
  }

  * {
    box-sizing: border-box;
  };

  *:focus {
    outline: none;
  };

  html {
    position: relative;
    min-height: 100%;
    overflow-y: auto;
  }; 


  body {
    margin: 0;
    padding: 0;
  };

  body, button, input, textarea {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: var(--backgroudColor);
    color: #262626;
    font-size: 14px;
    line-height: 18px;
  };

  a, a:visited {
    text-decoration: none;
  }
`;
