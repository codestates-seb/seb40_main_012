import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

const BookWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 15px 0px;
`;

const PairingOriginBookContainer = styled.div`
  @media screen and (max-width: 980px) {
    padding: 0px 10px;
  }
  width: 25%;
  padding: 0px 20px;
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
  max-width: 60%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  justify-content: flex-start;
  .title {
    color: ${({ theme }) => theme.colors.dark};
  }
  .author {
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.gray};
  }
  .rating {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const PairingOriginBook = ({ bookTitle, author, rating, bookId }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <BookWrapper>
        <PairingOriginBookContainer onClick={handleBookClick}>
          <img
            src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
            alt="book cover"
          />
        </PairingOriginBookContainer>
        <BookInfo>
          <div className="title">{bookTitle}</div>
          <div className="author">{author}</div>
          <div className="rating">★ {rating}</div>
        </BookInfo>
      </BookWrapper>
    </ThemeProvider>
  );
};

export default PairingOriginBook;
