import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectonMediumBook from './CollectionMediumBook';
import CollectionTags from './CollectinTags';

const CollectionMediumBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }
`;

const CollectionMediumInfo = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainColor};
  white-space: nowrap;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const MediumHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const MediumBooks = styled.div`
  display: flex;
`;

const CollectonMediumBooks = ({ collection }) => {
  const navigate = useNavigate();

  const onClickCollection = () => {
    navigate(`/collection/${collection.collectionId}`);
  };

  return (
    <CollectionMediumBooksContainer onClick={onClickCollection}>
      <MediumHeader>
        <CollectionMediumInfo>{collection?.title ?? ''}</CollectionMediumInfo>
        <CollectionTags tagList={['소설', 'sf']} />
      </MediumHeader>
      <MediumBooks>
        {collection?.books.slice(0, 3).map((el, idx) => {
          return (
            <CollectonMediumBook
              key={idx}
              bookTitle={el.title}
              cover={el.bookCover}
            />
          );
        })}
      </MediumBooks>
    </CollectionMediumBooksContainer>
  );
};

export default CollectonMediumBooks;
