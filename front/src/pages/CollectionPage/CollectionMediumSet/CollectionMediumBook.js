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

const CollectonMediumBook = () => {
  return (
    <CollectionMediumBookContainer>
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
    </CollectionMediumBookContainer>
  );
};

export default CollectonMediumBook;
