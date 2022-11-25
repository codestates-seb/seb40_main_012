import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollectionDetailBook from './CollectionDetailBook';

const CollectionDetailBooksContainer = styled.div`
  padding: 25px 20px;
`;

const CollectionBooksTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
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
              rating={el.ratingCount}
              bookId={el.isbn13}
              cover={el.bookCover}
              author={el.author}
            />
          );
        })}
        {/* <CollectionDetailBook
          bookTitle={booksData.length === 0 ? '' : booksData[0].item[0].title}
          rating="1.0"
          bookid="1"
          cover={booksData.length === 0 ? '' : booksData[0].item[0].cover}
          author={booksData.length === 0 ? '' : booksData[0].item[0].author}
        /> */}
        {/* <CollectionDetailBook
          bookTitle="제목"
          rating="1.0"
          bookid="1"
          cover="cover"
        /> */}
      </BooksContainer>
    </CollectionDetailBooksContainer>
  );
};

export default CollectionDetailBooks;
