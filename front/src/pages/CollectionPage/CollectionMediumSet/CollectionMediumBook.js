import styled from 'styled-components';

const CollectionMediumBookContainer = styled.div`
  width: 32%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 5px;
  }
  @media screen and (max-width: 500px) {
    width: 33%;
    img {
      padding: 2px;
    }
  }
`;

const CollectionBookTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  word-wrap: break-all;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 640px) {
    font-size: 11px;
  }
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
