import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`

  ${reset}
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
    font-family: 'Pretendard-Regular' !important;
    margin: 0;
    padding: 0;
  }
  html, body, div#__next {
    height: 100%;
    
  }
`;
