// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import CollectionSmallBook from '../../CollectionPage/CollectionSmallSet/CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

const BookColumn = styled.div`
  display: flex;
`;

const CollectionSmallBookContainer = styled.div`
  width: 50%;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 2px;
  }
`;

// const CollectionSmallInfo = styled.div`
//   font-size: 14px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.darkgray};
// `;

const CollectionThumbnail = () =>
  // { books }
  {
    // const navigate = useNavigate();

    // const onClickCollectionInfo = () => {
    //   navigate(`/collection/${collectionId}`);

    // };

    console.log('books', books);
    const books = [
      '/images/cherrypick_loading.gif',
      '/images/cherrypick_loading.gif',
      '/images/cherrypick_loading.gif',
      '/images/cherrypick_loading.gif',
    ];

    return (
      <CollectionSmallBooksContainer
      //  onClick={onClickCollectionInfo}
      >
        <BookColumn>
          <CollectionSmallBookContainer>
            <img src={books[0]} alt="book"></img>
          </CollectionSmallBookContainer>
          <CollectionSmallBookContainer>
            <img src={books[1]} alt="book"></img>
          </CollectionSmallBookContainer>
        </BookColumn>
        <BookColumn>
          <CollectionSmallBookContainer>
            <img src={books[2]} alt="book"></img>
          </CollectionSmallBookContainer>
          <CollectionSmallBookContainer>
            <img src={books[3]} alt="book"></img>
          </CollectionSmallBookContainer>
        </BookColumn>
        {/* <CollectionSmallInfo>{title}</CollectionSmallInfo> */}
      </CollectionSmallBooksContainer>
    );
  };

export default CollectionThumbnail;
