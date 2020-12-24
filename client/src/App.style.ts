import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: #FAFAFA;
  };
`;
