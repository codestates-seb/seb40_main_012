import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

const CollectionLargeBookContainer = styled.div`
  width: 15%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
  }
`;

const CollectionBookTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const CollectionLargeBook = ({ bookTitle }) => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionLargeBookContainer>
        <img
          src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
          alt="book cover"
        />
        <CollectionBookTitle>{bookTitle}</CollectionBookTitle>
      </CollectionLargeBookContainer>
    </ThemeProvider>
  );
};

export default CollectionLargeBook;
