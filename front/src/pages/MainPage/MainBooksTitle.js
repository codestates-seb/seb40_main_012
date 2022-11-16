import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const MainBooksTitleContainer = styled.div`
  width: 100%;
  margin: 50px 0 20px 0;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
`;

const MainBooksTitle = ({ title }) => {
  return (
    <ThemeProvider theme={theme}>
      <MainBooksTitleContainer>{title}</MainBooksTitleContainer>
    </ThemeProvider>
  );
};

export default MainBooksTitle;
