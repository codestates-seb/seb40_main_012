import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectonMediumBooks from './CollectionMediumBooks';

const CollectionMediumSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 0 40px;
`;

const CollectionBooks = styled.div`
  display: flex;
`;

const CollectionMediumSet = ({ title }) => {
  return (
    <CollectionMediumSetContainer>
      <CollectionSetTitle title={title} />
      <CollectionBooks>
        <CollectonMediumBooks />
        <CollectonMediumBooks />
      </CollectionBooks>
    </CollectionMediumSetContainer>
  );
};

export default CollectionMediumSet;
