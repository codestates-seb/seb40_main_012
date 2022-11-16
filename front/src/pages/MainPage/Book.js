import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const BookContainer = styled.div`
  width: 25%;
  padding: 10px;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
  }
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  white-space: nowrap;
`;

const Book = ({ bookTitle }) => {
  return (
    <ThemeProvider theme={theme}>
      <BookContainer>
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
