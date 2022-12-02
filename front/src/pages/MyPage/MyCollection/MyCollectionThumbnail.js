import styled from 'styled-components';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 112px !important;
  height: 158px !important;
  padding: 10px !important;
  margin: 0 10px;

  &:hover {
    cursor: pointer;
  }
  &.active:hover {
    border: none;
    margin: 0 10px;
  }
  &.small {
    width: 23%;
  }
  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }
`;

const CollectionSmallBookContainer = styled.div`
  width: 50%;
  img {
    aspect-ratio: 7 / 10 !important;
    object-fit: cover !important;
    padding: 2px !important;
    height: 100% !important;
    width: 100% !important;
  }
`;

const BookColumn = styled.div`
  display: flex !important;
  height: 95% !important;
  aspect-ratio: 1.38 !important;
  background-color: #f5f5f5 !important;
`;

const MyCollectionThumbnail = ({ data }) => {
  return (
    <CollectionSmallBooksContainer>
      <BookColumn>
        <CollectionSmallBookContainer>
          {data.books[0] ? (
            <img src={data.books[0].bookCover} alt="book"></img>
          ) : (
            <img src={'/images/collection.png'} alt="book thumbnail"></img>
          )}
        </CollectionSmallBookContainer>
        <CollectionSmallBookContainer>
          {data.books[1] ? (
            <img src={data.books[1].bookCover} alt="book"></img>
          ) : (
            <img src={'/images/collection.png'} alt="book thumbnail"></img>
          )}
        </CollectionSmallBookContainer>
      </BookColumn>
      <BookColumn>
        <CollectionSmallBookContainer>
          {data.books[2] ? (
            <img src={data.books[2].bookCover} alt="book"></img>
          ) : (
            <img src={'/images/collection.png'} alt="book thumbnail"></img>
          )}
        </CollectionSmallBookContainer>
        <CollectionSmallBookContainer>
          {data.books[3] ? (
            <img src={data.books[3].bookCover} alt="book"></img>
          ) : (
            <img src={'/images/collection.png'} alt="book thumbnail"></img>
          )}
        </CollectionSmallBookContainer>
      </BookColumn>
    </CollectionSmallBooksContainer>
  );
};

export default MyCollectionThumbnail;
