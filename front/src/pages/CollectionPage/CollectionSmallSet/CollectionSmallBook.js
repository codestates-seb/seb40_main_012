import styled from 'styled-components';

const CollectionSmallBookContainer = styled.div`
  width: 50%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 2px;
  }
`;

const CollectionSmallBook = () => {
  return (
    <CollectionSmallBookContainer>
      <img
        src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
        alt="book cover"
      />
    </CollectionSmallBookContainer>
  );
};

export default CollectionSmallBook;
