import styled from 'styled-components';
import SearchBook from './SearchBook';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';

const SearchBooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50px;
    height: 50px;
  }
  &.hide {
    display: none;
  }
`;

const SearchBooks = () => {
  const { keyword } = useParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/search?Category=books&Query=${keyword}&Sort=accuracy`)
      .then((res) => {
        setBooks(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SearchBooksContainer>
      {isLoading ? (
        <LoadingContainer className={isLoading ? 'show' : 'hide'}>
          <img
            src={process.env.PUBLIC_URL + '/images/spinner.gif'}
            alt="spinner"
          />
        </LoadingContainer>
      ) : (
        <>
          {books.map((el, idx) => {
            return (
              <SearchBook
                key={idx}
                cover={el.cover}
                title={el.title}
                author={el.author}
                year={el.pubDate}
                isbn={el.isbn13}
              />
            );
          })}
        </>
      )}
    </SearchBooksContainer>
  );
};

export default SearchBooks;
