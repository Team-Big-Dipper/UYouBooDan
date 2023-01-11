import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: 'Inter' !important;
    margin: 0;
    padding: 0;
  }
  html, body, div#__next {
    height: 100%;
  }
`;
