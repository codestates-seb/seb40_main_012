import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSmallBook from './CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

const BookColumn = styled.div`
  display: flex;
  aspect-ratio: 1.38;
  background-color: #f5f5f5;
`;

const CollectionSmallInfo = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const CollectionSmallBooks = ({ collectionId, title, books }) => {
  const navigate = useNavigate();

  const onClickCollectionInfo = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <CollectionSmallBooksContainer onClick={onClickCollectionInfo}>
      <BookColumn>
        {books.slice(0, 2).map((el) => {
          return <CollectionSmallBook key={el.isbn13} cover={el.bookCover} />;
        })}
      </BookColumn>
      <BookColumn>
        {books.slice(2, 4).map((el) => {
          return <CollectionSmallBook key={el.isbn13} cover={el.bookCover} />;
        })}
      </BookColumn>
      <CollectionSmallInfo>{title}</CollectionSmallInfo>
    </CollectionSmallBooksContainer>
  );
};

export default CollectionSmallBooks;
