import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const GuideContainer = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
  padding: 0 30px;
  display: flex;
  align-items: center;
  div {
    margin-right: 5px;
  }
  img {
    &:hover {
      cursor: pointer;
    }
  }
`;

//TODO: 페어링, 컬렉션 안내 메시지 추가
const Guide = () => {
  return (
    <ThemeProvider theme={theme}>
      <GuideContainer>
        <div>페어링, 컬렉션</div>
        <img
          src={process.env.PUBLIC_URL + '/images/question_icon.svg'}
          alt="question"
        />
      </GuideContainer>
    </ThemeProvider>
  );
};

export default Guide;
