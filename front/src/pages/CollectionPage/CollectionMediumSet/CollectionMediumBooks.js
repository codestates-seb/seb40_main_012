import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import CollectonMediumBook from './CollectionMediumBook';
import CollectionTags from './CollectinTags';

const CollectionMediumBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  &:hover {
    cursor: pointer;
  }
`;

const CollectionMediumInfo = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
  white-space: nowrap;
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

const CollectonMediumBooks = () => {
  const navigate = useNavigate();

  const onClickCollection = (collectionID) => {
    navigate(`/collection/${collectionID}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CollectionMediumBooksContainer onClick={() => onClickCollection(1)}>
        <MediumHeader>
          <CollectionMediumInfo>김뫄뫄님의 컬렉션</CollectionMediumInfo>
          <CollectionTags tagList={['소설', 'sf']} />
        </MediumHeader>
        <MediumBooks>
          <CollectonMediumBook />
          <CollectonMediumBook />
          <CollectonMediumBook />
        </MediumBooks>
      </CollectionMediumBooksContainer>
    </ThemeProvider>
  );
};

export default CollectonMediumBooks;
