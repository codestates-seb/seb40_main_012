import { useState } from 'react';
import styled from 'styled-components';
import NewBook from './NewBook';
import axios from '../../../api/axios';

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
  height: 500px;
  overflow-y: auto;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
`;

const BookSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleOnChangeInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === '') setSearchedBooks([]);
  };

  const handleSearchBook = (e) => {
    if (e.key === 'Enter') {
      axios
        .get(`/api/search/books?title=${searchInput}`)
        .then((res) => {
          setSearchedBooks(res.data.item);
        })
        .catch((error) => console.error(error));
      setSearchInput('');
      setSearchedBooks(searchedBooks);
    }
  };

  return (
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
            return (
              <NewBook
                key={idx}
                title={el.title}
                author={el.author}
                cover={el.cover}
              />
            );
          })}
        </SearchedBooks>
      </Books>
    </BookSearchContainer>
  );
};

export default BookSearch;
