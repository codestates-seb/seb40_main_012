import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import NewBook from './NewBook';

const NewBooksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NewBooksTitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainColor};
`;

const Books = styled.div`
  display: flex;
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const NewBooks = () => {
  return (
    <ThemeProvider theme={theme}>
      <NewBooksContainer>
        <NewBooksTitle>나의 새로운 컬렉션</NewBooksTitle>
        <Books>
          <NewBook />
          <NewBook />
          <NewBook />
        </Books>
      </NewBooksContainer>
    </ThemeProvider>
  );
};

export default NewBooks;
