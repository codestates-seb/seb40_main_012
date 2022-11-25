// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSmallBook from '../../../pages/CollectionPage/CollectionSmallSet/CollectionSmallBook';

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
  books = [
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
        {books.slice(0, 2).map((el) => {
          return (
            <CollectionSmallBook
              key={el.index}
              cover={'/images/cherrypick_loading.gif'}
            />
          );
        })}
      </BookColumn>
      <BookColumn>
        {books.slice(2, 4).map((el) => {
          return (
            <CollectionSmallBook
              key={el.index}
              cover={'/images/cherrypick_loading.gif'}
            />
          );
        })}
      </BookColumn>
      {/* <CollectionSmallInfo>{title}</CollectionSmallInfo> */}
    </CollectionSmallBooksContainer>
  );
};

export default CollectionThumbnail;
