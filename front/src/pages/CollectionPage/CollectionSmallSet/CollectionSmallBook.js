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

const CollectionSmallBook = ({ cover }) => {
  return (
    <CollectionSmallBookContainer>
      <img src={cover} alt="book cover" />
    </CollectionSmallBookContainer>
  );
};

export default CollectionSmallBook;
