import styled from 'styled-components';
import CollectionLargeBook from './CollectionLargeBook';

const CollectionLargeBooksContainer = styled.div`
  display: flex;
  margin: 0 15px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }
`;

const CollectionLargeBooks = ({ books }) => {
  return (
    <CollectionLargeBooksContainer>
      {books?.slice(0, 6).map((el) => {
        return (
          <CollectionLargeBook
            key={el.isbn13}
            bookTitle={el.title}
            cover={el.bookCover}
          />
        );
      })}
    </CollectionLargeBooksContainer>
  );
};

export default CollectionLargeBooks;
