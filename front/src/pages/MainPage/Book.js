import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const BookContainer = styled.div`
  width: 25%;
  padding: 10px;
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

const Book = ({ bookTitle, bookId }) => {
  const navigate = useNavigate();

  const onClickBook = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <BookContainer onClick={onClickBook}>
        <img
          src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
          alt="book cover"
        />
        <BookTitle>{bookTitle}</BookTitle>
      </BookContainer>
    </ThemeProvider>
  );
};

export default Book;
