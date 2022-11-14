import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import CollectionSmallBook from './CollectionSmallBook';

const CollectionSmallBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const BookColumn = styled.div`
  display: flex;
`;

const CollectionSmallInfo = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  &:hover {
    cursor: pointer;
  }
`;

const CollectionSmallBooks = ({ title }) => {
  const navigate = useNavigate();

  const onClickCollectionInfo = () => {
    navigate('/collection/{collection_id}');
  };

  return (
    <ThemeProvider theme={theme}>
      <CollectionSmallBooksContainer>
        <BookColumn>
          <CollectionSmallBook />
          <CollectionSmallBook />
        </BookColumn>
        <BookColumn>
          <CollectionSmallBook />
          <CollectionSmallBook />
        </BookColumn>
        <CollectionSmallInfo onClick={onClickCollectionInfo}>
          {title}
        </CollectionSmallInfo>
      </CollectionSmallBooksContainer>
    </ThemeProvider>
  );
};

export default CollectionSmallBooks;
