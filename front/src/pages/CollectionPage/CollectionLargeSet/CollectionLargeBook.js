import styled from 'styled-components';

const CollectionLargeBookContainer = styled.div`
  width: 15%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
  }
  @media screen and (max-width: 500px) {
    width: 16%;
  }
`;

const CollectionBookTitle = styled.div`
  .title {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    word-wrap: break-all;
    overflow: hidden;
    line-height: 1.5;
    max-height: 3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  @media screen and (max-width: 640px) {
    .title {
      font-size: 12px;
      font-weight: 500;
    }
  }
  @media screen and (max-width: 500px) {
    .title {
      font-size: 10px;
    }
  }
`;

const CollectionLargeBook = ({ bookTitle, cover }) => {
  return (
    <CollectionLargeBookContainer>
      <img src={cover} alt="book cover" />
      <CollectionBookTitle>
        <div className="title">{bookTitle}</div>
      </CollectionBookTitle>
    </CollectionLargeBookContainer>
  );
};

export default CollectionLargeBook;
