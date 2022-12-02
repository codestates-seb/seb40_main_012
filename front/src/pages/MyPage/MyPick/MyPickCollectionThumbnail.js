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
`;

const BookImg = styled.div`
  cursor: pointer;
  .resize {
    box-sizing: inherit;
    width: 108px !important;
    height: 164px !important;
    margin-left: 10px;
  }
  .resize-book {
    box-sizing: inherit;
    width: 112px !important;
    height: 158px !important;
    padding: 10px !important;
    margin-left: 8px;
    filter: drop-shadow(3px 3px 3px rgb(93 93 93 / 80%));
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

const MyPickCollectionThumbnail = ({ data }) => {
  return (
    <>
      {data[0]?.bookCover ? (
        <>
          <CollectionSmallBooksContainer className="move-image">
            <BookColumn>
              <CollectionSmallBookContainer>
                {data[0]?.bookCover ? (
                  <img src={data[0].bookCover} alt="book"></img>
                ) : (
                  <img
                    src={'/images/collection.png'}
                    alt="book thumbnail"
                  ></img>
                )}
              </CollectionSmallBookContainer>
              <CollectionSmallBookContainer>
                {data[1]?.bookCover ? (
                  <img src={data[1].bookCover} alt="book"></img>
                ) : (
                  <img
                    src={'/images/collection.png'}
                    alt="book thumbnail"
                  ></img>
                )}
              </CollectionSmallBookContainer>
            </BookColumn>
            <BookColumn>
              <CollectionSmallBookContainer>
                {data[2]?.bookCover ? (
                  <img src={data[2].bookCover} alt="book"></img>
                ) : (
                  <img
                    src={'/images/collection.png'}
                    alt="book thumbnail"
                  ></img>
                )}
              </CollectionSmallBookContainer>
              <CollectionSmallBookContainer>
                {data[3]?.bookCover ? (
                  <img src={data[3].bookCover} alt="book"></img>
                ) : (
                  <img
                    src={'/images/collection.png'}
                    alt="book thumbnail"
                  ></img>
                )}
              </CollectionSmallBookContainer>
            </BookColumn>
          </CollectionSmallBooksContainer>
        </>
      ) : (
        <BookImg>
          <img
            className="resize"
            src={'/images/collection.png'}
            alt="book thumbnail"
          ></img>
        </BookImg>
      )}
    </>
  );
};

export default MyPickCollectionThumbnail;
