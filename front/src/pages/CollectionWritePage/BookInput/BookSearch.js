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
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const Books = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  @media screen and (max-width: 500px) {
    padding: 2px;
  }
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
  @media screen and (max-width: 500px) {
    font-size: 11px;
  }
`;

const SearchedBooks = styled.div`
  width: 100%;
  margin: 20px 0;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    &.hide {
      display: none;
    }
    @media screen and (max-width: 500px) {
      width: 25px;
      height: 25px;
    }
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-y: auto;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
`;

const BookSearch = ({
  newBooks,
  setNewBooks,
  newBooksInfo,
  setNewBooksInfo,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === '') {
      setSearchedBooks([]);
      setIsLoading(false);
    }
  };

  const handleSearchBook = (e) => {
    setIsLoading(true);
    if (e.key === 'Enter') {
      axios
        .get(`/api/search/collectionbooks?Query=${searchInput}`)
        .then((res) => {
          setSearchedBooks(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSetNewBooks = (isbn) => {
    if (!newBooks.includes(isbn) && newBooks.length <= 30) {
      setNewBooks([...newBooks, isbn]);
      axios.get(`/api/books/${isbn}`).then((res) => {
        setNewBooksInfo([...newBooksInfo, res.data.data]);
      });
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
          <img
            src={process.env.PUBLIC_URL + '/images/spinner.gif'}
            alt="spinner"
            className={isLoading ? 'show' : 'hide'}
          />
          <ScrollContainer>
            {searchedBooks.map((el, idx) => {
              return (
                <NewBook
                  key={idx}
                  title={el.title}
                  author={el.author}
                  cover={el.cover}
                  isbn={el.isbn13}
                  handleSetNewBooks={handleSetNewBooks}
                  search={true}
                />
              );
            })}
          </ScrollContainer>
        </SearchedBooks>
      </Books>
    </BookSearchContainer>
  );
};

export default BookSearch;
