// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import CollectionSmallBook from '../../../pages/CollectionPage/CollectionSmallSet/CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
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

const BookColumn = styled.div`
  display: flex;
`;

// const CollectionSmallInfo = styled.div`
//   font-size: 14px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.darkgray};
// `;

const CollectionThumbnail = ({ books }) => {
  // const navigate = useNavigate();

  // const onClickCollectionInfo = () => {
  //   navigate(`/collection/${collectionId}`);
  // };
  console.log('books', books);
  const testBooks = [
    { bookCover: '/images/cherrypick_loading.gif' },
    { bookCover: '/images/cherrypick_loading.gif' },
    { bookCover: '/images/cherrypick_loading.gif' },
    { bookCover: '/images/cherrypick_loading.gif' },
  ];

  return (
    <CollectionSmallBooksContainer
    //  onClick={onClickCollectionInfo}
    >
      <BookColumn>
        <CollectionSmallBookContainer>
          <img src={testBooks[0].bookCover} alt="book"></img>
        </CollectionSmallBookContainer>
        <CollectionSmallBookContainer>
          <img src={testBooks[1].bookCover} alt="book"></img>
        </CollectionSmallBookContainer>
      </BookColumn>
      <BookColumn>
        <CollectionSmallBookContainer>
          <img src={testBooks[2].bookCover} alt="book"></img>
        </CollectionSmallBookContainer>
        <CollectionSmallBookContainer>
          <img src={testBooks[3].bookCover} alt="book"></img>
        </CollectionSmallBookContainer>
      </BookColumn>
      {/* <CollectionSmallInfo>{title}</CollectionSmallInfo> */}
    </CollectionSmallBooksContainer>
  );
};

export default CollectionThumbnail;
