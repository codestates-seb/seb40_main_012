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
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 500px) {
    font-size: 10px;
    font-weight: 500;
  }
`;

const CollectonMediumBook = ({ bookTitle, cover }) => {
  return (
    <CollectionMediumBookContainer>
      <img src={cover} alt="book cover" />
      <CollectionBookTitle>{bookTitle}</CollectionBookTitle>
    </CollectionMediumBookContainer>
  );
};

export default CollectonMediumBook;
