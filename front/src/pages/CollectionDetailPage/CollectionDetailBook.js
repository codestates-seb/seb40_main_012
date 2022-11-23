import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CollectionDetailBookContainer = styled.div`
  @media screen and (max-width: 980px) {
    padding: 10px;
  }
  width: 25%;
  padding: 25px;
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

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  justify-content: space-between;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    word-wrap: normal;
  }
  .rating {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const CollectionDetailBook = ({ bookTitle, rating, bookId }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <CollectionDetailBookContainer onClick={handleBookClick}>
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
      <BookInfo>
        <div className="title">{bookTitle}</div>
        <div className="rating">★ {rating}</div>
      </BookInfo>
    </CollectionDetailBookContainer>
  );
};

export default CollectionDetailBook;
