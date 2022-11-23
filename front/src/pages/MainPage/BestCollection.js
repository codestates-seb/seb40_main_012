import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BestCollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

const BookColumn = styled.div`
  display: flex;
`;

const BestCollectionBook = styled.div`
  width: 50%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 2px;
  }
`;

const BestCollectionInfo = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  white-space: nowrap;
`;

const BestCollection = ({ title, collectionId }) => {
  const navigate = useNavigate();

  const onClickBestCollection = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <BestCollectionContainer onClick={onClickBestCollection}>
      <BookColumn>
        <BestCollectionBook>
          <img
            src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
            alt="book cover"
          />
        </BestCollectionBook>
        <BestCollectionBook>
          <img
            src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
            alt="book cover"
          />
        </BestCollectionBook>
      </BookColumn>
      <BookColumn>
        <BestCollectionBook>
          <img
            src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
            alt="book cover"
          />
        </BestCollectionBook>
        <BestCollectionBook>
          <img
            src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
            alt="book cover"
          />
        </BestCollectionBook>
      </BookColumn>
      <BestCollectionInfo>{title}</BestCollectionInfo>
    </BestCollectionContainer>
  );
};

export default BestCollection;
