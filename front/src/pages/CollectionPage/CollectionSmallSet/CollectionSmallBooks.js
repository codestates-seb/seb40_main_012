import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSmallBook from './CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px 10px;
  border: 3px solid transparent;
  &:hover {
    cursor: pointer;
  }
  &.active:hover {
    border: none;
    margin: 0 10px;
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
  height: 100%;
  aspect-ratio: 1.38;
  background-color: #f5f5f5;
`;

const CollectionSmallInfo = styled.div`
  height: 40px;
  .title {
    font-size: 16px;
    font-weight: 700;
    word-break: break-all;
    overflow: hidden;
    line-height: 1.5;
    max-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.darkgray};
  @media screen and (max-width: 640px) {
    .title {
      font-size: 12px;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 500px) {
    .title {
      font-size: 10px;
      font-weight: 600;
    }
  }
`;

const CollectionSmallBooks = ({
  collectionId,
  title,
  books,
  type = 'basic',
  len,
}) => {
  const navigate = useNavigate();

  const onClickCollectionInfo = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <CollectionSmallBooksContainer
      onClick={onClickCollectionInfo}
      className={`${type === 'small' ? 'small' : null} ${
        len >= 4 ? 'active' : null
      }`}
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
      <CollectionSmallInfo>
        <div className="title">{title}</div>
      </CollectionSmallInfo>
    </CollectionSmallBooksContainer>
  );
};

export default CollectionSmallBooks;
