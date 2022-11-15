import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

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
  font-size: 16px;
  font-weight: 700;
  justify-content: space-between;
  white-space: nowrap;
  .title {
    color: ${({ theme }) => theme.colors.dark};
  }
  .rating {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const CollectionDetailBook = ({ bookTitle, rating, bookId }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default CollectionDetailBook;
