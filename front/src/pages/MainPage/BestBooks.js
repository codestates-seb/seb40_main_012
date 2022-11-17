import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Book from './Book';
import MainBooksTitle from './MainBooksTitle';

const BestBooksContainer = styled.div`
  display: flex;
  padding: 10px 40px;
  flex-direction: column;
`;

const BooksContainer = styled.div`
  display: flex;
`;

const BestBooks = () => {
  const [bestBooks, setBestBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books/best')
      .then((response) => {
        setBestBooks(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <BestBooksContainer>
      <MainBooksTitle title="체리픽에서 많이 본 책" />
      <BooksContainer>
        {bestBooks.map((el, idx) => {
          return (
            <Book
              key={el.BestBooksbookId}
              bookTitle={el.title}
              bookId={el.bookId}
              isBest={true}
              ranking={idx + 1}
            />
          );
        })}
      </BooksContainer>
    </BestBooksContainer>
  );
};

export default BestBooks;
