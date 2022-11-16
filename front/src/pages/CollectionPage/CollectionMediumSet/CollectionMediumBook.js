import styled from 'styled-components';

const CollectionMediumBookContainer = styled.div`
  width: 33.336%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 2px;
  }
`;

const CollectionBookTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const CollectonMediumBook = ({ bookTitle }) => {
  return (
    <CollectionMediumBookContainer>
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
      <CollectionBookTitle>{bookTitle}</CollectionBookTitle>
    </CollectionMediumBookContainer>
  );
};

export default CollectonMediumBook;
