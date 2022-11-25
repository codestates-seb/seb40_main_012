import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSmallBook from './CollectionSmallBook';

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

const CollectionSmallInfo = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const CollectionSmallBooks = ({ title }) => {
  const navigate = useNavigate();

  const onClickCollectionInfo = () => {
    navigate('/collection/{collection_id}');
  };

  return (
    <CollectionSmallBooksContainer onClick={onClickCollectionInfo}>
      <BookColumn>
        <CollectionSmallBook />
        <CollectionSmallBook />
      </BookColumn>
      <BookColumn>
        <CollectionSmallBook />
        <CollectionSmallBook />
      </BookColumn>
      <CollectionSmallInfo>{title}</CollectionSmallInfo>
    </CollectionSmallBooksContainer>
  );
};

export default CollectionSmallBooks;
