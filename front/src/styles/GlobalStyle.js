import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-named-as-default
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: RobotoInCjk, 'Noto Sans KR', 'Apple SD Gothic Neo',
      'Nanum Gothic', 'Malgun Gothic', sans-serif;
      overflow: scroll !important;
  }
  
  a {
    text-decoration-color: rgba(25, 118, 210, 0.4);
    color: #1976d2;
    letter-spacing: 0.01071em;
    font-weight: 400
  }
`;
export default GlobalStyle;
