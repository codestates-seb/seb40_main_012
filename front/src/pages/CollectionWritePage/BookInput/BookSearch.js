import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import NewBook from './NewBook';

const BookSearchContainer = styled.div`
  margin: 10px 0;
`;

const BookSearchTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  display: flex;
`;

const Books = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 10px;
  img {
    position: absolute;
    top: 8px;
    left: 0;
  }
`;

const BookSearchbar = styled.input`
  width: 100%;
  border: none;
  padding: 12px;
  padding-left: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  &:focus {
    outline: none;
  }
`;

const SearchedBooks = styled.div`
  width: 100%;
  margin: 20px 0;
  //border: 1px solid ${({ theme }) => theme.colors.dark};
  display: flex;
`;

const BookSearch = ({ newBooks, setNewBooks }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([
    {
      title: '책 제목1---',
      author: '저자1---',
    },
    {
      title: '책 제목2---',
      author: '저자2---',
    },
  ]);

  const handleOnChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchBook = (e) => {
    if (e.key === 'Enter') {
      console.log('검색 api 호출: ', searchInput);
      setSearchInput('');
      setSearchedBooks(searchedBooks);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BookSearchContainer>
        <BookSearchTitle>책 검색</BookSearchTitle>
        <Books>
          <SearchContainer>
            <BookSearchbar
              type="text"
              placeholder="컬렉션에 추가할 책을 검색해보세요"
              value={searchInput}
              onChange={handleOnChangeInput}
              onKeyPress={handleSearchBook}
            ></BookSearchbar>
            <img
              src={process.env.PUBLIC_URL + '/images/Search_Icon.svg'}
              alt="search"
            />
          </SearchContainer>
          <SearchedBooks>
            {searchedBooks.map((el, idx) => {
              return <NewBook key={idx} title={el.title} author={el.author} />;
            })}
          </SearchedBooks>
        </Books>
      </BookSearchContainer>
    </ThemeProvider>
  );
};

export default BookSearch;
