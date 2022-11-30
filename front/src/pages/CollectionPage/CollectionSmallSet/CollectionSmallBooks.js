import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSmallBook from './CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  padding: 3px;
  border: 3px solid transparent;
  &:hover {
    cursor: pointer;
    border: none;
    margin: 0 13px;
    padding: 0;
  }
  &.small {
    width: 23%;
  }
  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }
`;

const BookColumn = styled.div`
  display: flex;
  aspect-ratio: 1.38;
  background-color: #f5f5f5;
`;

const CollectionSmallInfo = styled.div`
  font-size: 16px;
  font-weight: 700;
  word-break: break-all;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.darkgray};
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const CollectionSmallBooks = ({
  collectionId,
  title,
  books,
  type = 'basic',
}) => {
  const navigate = useNavigate();

  const onClickCollectionInfo = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <CollectionSmallBooksContainer
      onClick={onClickCollectionInfo}
      className={type === 'small' ? 'small' : null}
    >
      <BookColumn>
        {books.slice(0, 2).map((el, idx) => {
          return (
            <CollectionSmallBook
              key={el.isbn13 || idx}
              cover={el.bookCover || el}
            />
          );
        })}
      </BookColumn>
      <BookColumn>
        {books.slice(2, 4).map((el, idx) => {
          return (
            <CollectionSmallBook
              key={el.isbn13 || idx}
              cover={el.bookCover || el}
            />
          );
        })}
      </BookColumn>
      <CollectionSmallInfo>{title}</CollectionSmallInfo>
    </CollectionSmallBooksContainer>
  );
};

export default CollectionSmallBooks;
