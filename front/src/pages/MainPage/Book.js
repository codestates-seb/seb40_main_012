import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BookContainer = styled.div`
  width: 25%;
  padding: 10px;
  position: relative;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
  }
  &:hover {
    cursor: pointer;
  }
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  white-space: nowrap;
`;

const RankInfo = styled.div`
  position: absolute;
  top: 2;
  left: 2;
  width: 25px;
  height: 25px;
  padding-top: 2px;
  background-color: ${({ theme }) => theme.colors.darkgray};
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
`;

const Book = ({ bookTitle, bookId, ranking = 0, isBest = false }) => {
  const navigate = useNavigate();

  const onClickBook = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <BookContainer onClick={onClickBook}>
      {isBest ? <RankInfo>{ranking}</RankInfo> : null}
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
      <BookTitle>{bookTitle}</BookTitle>
    </BookContainer>
  );
};

export default Book;
