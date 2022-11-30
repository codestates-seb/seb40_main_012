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
  color: ${({ theme }) => theme.colors.dark};
  word-wrap: break-word;
  @media screen and (max-width: 500px) {
    font-size: 10px;
    font-weight: 500;
  }
`;

const CollectionLargeBook = ({ bookTitle, cover }) => {
  return (
    <CollectionLargeBookContainer>
      <img src={cover} alt="book cover" />
      <CollectionBookTitle>{bookTitle}</CollectionBookTitle>
    </CollectionLargeBookContainer>
  );
};

export default CollectionLargeBook;
