import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BookContainer = styled.div`
  width: 20%;
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
  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkgray};
  word-wrap: break-all;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 640px) {
    font-size: 12px;
    font-weight: 500;
  }
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
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

const Book = ({ bookTitle, isbn, ranking = 0, isBest = false, cover }) => {
  const navigate = useNavigate();

  const onClickBook = () => {
    navigate(`/book/${isbn}`);
  };

  return (
    <BookContainer onClick={onClickBook}>
      {isBest ? <RankInfo>{ranking}</RankInfo> : null}
      <img src={cover} alt="book cover" />
      <BookTitle>{bookTitle}</BookTitle>
    </BookContainer>
  );
};

export default Book;
