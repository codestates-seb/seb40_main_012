import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}, 
  body {
    font-family: RobotoInCjk, "Noto Sans KR", "Apple SD Gothic Neo", "Nanum Gothic", "Malgun Gothic", sans-serif;
   
   // 크롬 브라우저 스크롤 디자인
    *::-webkit-scrollbar {
    width: 14px;
  }

  *::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
    border-radius: 5px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #CFC3FF;
    border-radius: 14px;
    border: 2px solid white;
  }
  }

`;
export default GlobalStyle;
