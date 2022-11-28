import styled from 'styled-components';
import SearchBook from './SearchBook';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';

const SearchBooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SearchBooks = () => {
  const { keyword } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/search/collectionbooks?Query=${keyword}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <SearchBooksContainer>
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
    </SearchBooksContainer>
  );
};

export default SearchBooks;
