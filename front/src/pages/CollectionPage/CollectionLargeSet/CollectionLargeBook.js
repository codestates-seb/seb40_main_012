import styled from 'styled-components';

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
    <CollectionLargeBookContainer>
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
      <CollectionBookTitle>{bookTitle}</CollectionBookTitle>
    </CollectionLargeBookContainer>
  );
};

export default CollectionLargeBook;
