import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BookWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 15px 0px;
`;

const PairingOriginBookContainer = styled.div`
  @media screen and (max-width: 980px) {
    padding: 0px 10px;
  }
  width: 25%;
  padding: 0px 20px;
  margin-right: 20px;
  img {
    width: 100%;
    aspect-ratio: 6.5 / 10;
    object-fit: cover;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
  }
  &:hover {
    cursor: pointer;
  }
`;

const BookInfo = styled.div`
  display: flex;
  max-width: 60%;
  flex-direction: column;
  font-size: 14px;
  font-weight: 700;
  justify-content: flex-start;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 20px;
    @media screen and (min-width: 641px) {
      font-size: 30px;
    }
  }
  .category {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: lighter;
  }
  .rating {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 20px;
  }
  @media screen and (min-width: 641px) {
    font-size: 18px;
  }
  div {
    margin: 5px 0;
  }
`;

const PairingOriginBook = ({
  bookId,
  cover,
  bookTitle,
  author,
  publisher,
  year,
  category,
  rating,
  disabled,
}) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <BookWrapper>
      <PairingOriginBookContainer onClick={disabled ? null : handleBookClick}>
        <img src={cover} alt="book cover" />
      </PairingOriginBookContainer>
      <BookInfo>
        <div className="title">{bookTitle}</div>
        <div className="author">저자: {author}</div>
        <div className="publisher">출판사: {publisher}</div>
        <div className="year">출판년도: {year}</div>
        <div className="category">분류: {category}</div>
        <div className="rating">★ {rating}</div>
      </BookInfo>
    </BookWrapper>
  );
};

export default PairingOriginBook;
