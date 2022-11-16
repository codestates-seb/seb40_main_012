import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import CollectionLargeBook from './CollectionLargeBook';

const CollectionLargeBooksContainer = styled.div`
  display: flex;
  margin: 0 15px;
  justify-content: space-between;
`;

const CollectionLargeBooks = () => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionLargeBooksContainer>
        <CollectionLargeBook bookTitle="책 제목1" />
        <CollectionLargeBook bookTitle="책 제목2" />
        <CollectionLargeBook bookTitle="책 제목3" />
        <CollectionLargeBook bookTitle="책 제목4" />
        <CollectionLargeBook bookTitle="책 제목5" />
        <CollectionLargeBook bookTitle="책 제목6" />
      </CollectionLargeBooksContainer>
    </ThemeProvider>
  );
};

export default CollectionLargeBooks;
