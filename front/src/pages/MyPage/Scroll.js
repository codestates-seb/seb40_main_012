import styled from 'styled-components';
// import styled from 'styled-components';

const Scroll = styled.div`
  /* 크롬기준 스크롤바 디자인 부분 */
  *::-webkit-scrollbar {
    width: 14px;
  }

  *::-webkit-scrollbar-track {
    background: white;
    border-radius: 5px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #f7f3fa;
    border-radius: 14px;
    border: 2px solid white;
  }
`;
export default Scroll;
