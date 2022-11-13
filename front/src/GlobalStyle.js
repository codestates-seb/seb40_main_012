import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}, 
  body {
    font-family: RobotoInCjk, "Noto Sans KR", "Apple SD Gothic Neo", "Nanum Gothic", "Malgun Gothic", sans-serif;
  }
`;
export default GlobalStyle;
