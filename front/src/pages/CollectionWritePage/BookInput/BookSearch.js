import { useState } from 'react';
import styled from 'styled-components';
import NewBook from './NewBook';
import axios from '../../../api/axios';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  height: 400px;
  overflow-y: auto;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-y: auto;
  flex-wrap: wrap;
`;

const EndMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 700;
`;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

const BookSearch = ({
  newBooks,
  setNewBooks,
  newBooksInfo,
  setNewBooksInfo,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState({
    content: [],
    hasMore: false,
  });

  const handleOnChangeInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === '') setSearchedBooks({ ...searchedBooks, content: [] });
  };

  //TODO: 무한스크롤로 수정되어야 함
  const handleSearchBook = (e) => {
    if (e.key === 'Enter') {
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    if (searchedBooks.content.length >= 100) {
      setSearchedBooks({
        ...searchedBooks,
        hasMore: false,
      });
      return;
    }
    setTimeout(() => {
      axios
        .get(`/api/search/collectionbooks?Query=${searchInput}`)
        .then((res) => {
          setSearchedBooks({
            ...searchedBooks,
            content: searchedBooks.content.concat(res.data.content),
            hasMore: true,
          });
        })
        .catch((error) => console.error(error));
    }, 10);
  };

  const handleSetNewBooks = (isbn) => {
    if (!newBooks.includes(isbn)) {
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
            placeholder="컬렉션에 추가할 책 제목을 검색해보세요"
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
          <InfiniteScroll
            dataLength={searchedBooks.content.length}
            next={searchedBooks.content && fetchMoreData}
            hasMore={searchedBooks.hasMore}
            endMessage={
              <EndMessage>
                <div>더 이상 책이 없습니다.</div>
              </EndMessage>
            }
            loader={
              <LoaderContainer>
                <img
                  src={process.env.PUBLIC_URL + '/images/spinner.gif'}
                  alt="spinner"
                />
              </LoaderContainer>
            }
          >
            <ScrollContainer>
              {searchedBooks.content.map((el, idx) => {
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
          </InfiniteScroll>
        </SearchedBooks>
      </Books>
    </BookSearchContainer>
  );
};

export default BookSearch;
