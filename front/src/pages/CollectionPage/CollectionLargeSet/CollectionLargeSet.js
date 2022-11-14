import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectionLargeBooks from './CollectionLargeBooks';

const CollectionLargeSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 0 40px;
  &:hover {
    cursor: pointer;
  }
`;

const CollectionLargeSet = ({ title }) => {
  const navigate = useNavigate();

  const onClickCollection = (collectionId) => {
    navigate(`/collection/${collectionId}`);
  };
  return (
    <CollectionLargeSetContainer onClick={() => onClickCollection(1)}>
      <CollectionSetTitle title={title}></CollectionSetTitle>
      <CollectionLargeBooks />
    </CollectionLargeSetContainer>
  );
};

export default CollectionLargeSet;
