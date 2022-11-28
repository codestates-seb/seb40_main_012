import styled from 'styled-components';
import SearchBook from './SearchBook';

const SearchBooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SearchBooks = () => {
  return (
    <SearchBooksContainer>
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
      <SearchBook />
    </SearchBooksContainer>
  );
};

export default SearchBooks;
