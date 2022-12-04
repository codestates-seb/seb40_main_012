import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollectionDetailBook from './CollectionDetailBook';

const CollectionDetailBooksContainer = styled.div`
  padding: 25px 20px;
  @media screen and (max-width: 640px) {
    padding: 15px 10px;
  }
  @media screen and (max-width: 500px) {
    padding: 10px 5px;
  }
`;

const CollectionBooksTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const BooksContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const CollectionDetailBooks = ({ books }) => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    setBooksData(books);
  }, [books]);

  return (
    <CollectionDetailBooksContainer>
      <CollectionBooksTitle>책</CollectionBooksTitle>
      <BooksContainer>
        {booksData.map((el, idx) => {
          return (
            <CollectionDetailBook
              key={idx}
              bookTitle={el.title}
              rating={el.averageRating}
              bookId={el.isbn13}
              cover={el.bookCover}
              author={el.author}
            />
          );
        })}
      </BooksContainer>
    </CollectionDetailBooksContainer>
  );
};

export default CollectionDetailBooks;
