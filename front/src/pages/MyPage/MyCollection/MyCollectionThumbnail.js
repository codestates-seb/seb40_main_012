// import { useNavigate } from 'react-router-dom';
/*eslint-disable*/
import styled from 'styled-components';
import CollectionSmallBook from '../../CollectionPage/CollectionSmallSet/CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
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

// const CollectionSmallBookContainer = styled.div`
//   width: 50%;
//   img {
//     width: 100%;
//     aspect-ratio: 7 / 10;
//     object-fit: cover;
//     padding: 2px;
//   }
// `;

// const CollectionSmallInfo = styled.div`
//   font-size: 14px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.darkgray};
// `;

const MyCollectionThumbnail = ({ data }) => {
  // const navigate = useNavigate();

  // const onClickCollectionInfo = () => {
  //   navigate(`/collection/${collectionId}`);
  // };
  return (
    <CollectionSmallBooksContainer
    //  onClick={onClickCollectionInfo}
    >
      {/* {data.collectionCover.slice(0, 2)?.map((el, index) => {
          <>
            <CollectionSmallBookContainer key={index}>
              <img src={el} alt="book cover" />
            </CollectionSmallBookContainer>
          </>;
        })} */}
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
      {/* {data.collectionCover.slice(0, 2)?.map((el, index) => {
          return <CollectionSmallBook key={index} cover={el} />;
        })}
      </BookColumn>
      <BookColumn>
        {data.collectionCover.slice(2, 4)?.map((el, index) => {
          return <CollectionSmallBook key={index} cover={el} />;
        })}
      </BookColumn> */}
    </CollectionSmallBooksContainer>
  );
};

export default MyCollectionThumbnail;
