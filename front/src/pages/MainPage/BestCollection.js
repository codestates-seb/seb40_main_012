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
  height: 100%;
  aspect-ratio: 1.38;
  background-color: #f5f5f5;
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
  word-break: break-all;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 10px;
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    font-size: 10px;
    font-weight: 600;
  }
`;

const BestCollection = ({ title, collectionId, books }) => {
  const navigate = useNavigate();

  const onClickBestCollection = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <BestCollectionContainer onClick={onClickBestCollection}>
      <BookColumn>
        {books?.slice(0, 2).map((el, idx) => {
          return (
            <BestCollectionBook key={idx}>
              <img src={el.bookCover} alt="book cover" />
            </BestCollectionBook>
          );
        })}
      </BookColumn>
      <BookColumn>
        {books?.slice(2, 4).map((el, idx) => {
          return (
            <BestCollectionBook key={idx}>
              <img src={el.bookCover} alt="book cover" />
            </BestCollectionBook>
          );
        })}
      </BookColumn>
      <BestCollectionInfo>{title}</BestCollectionInfo>
    </BestCollectionContainer>
  );
};

export default BestCollection;
