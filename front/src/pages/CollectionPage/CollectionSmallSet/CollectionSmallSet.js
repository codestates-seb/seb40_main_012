import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectionSmallBooks from './CollectionSmallBooks';

const CollectionSmallSetContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 0 40px;
`;

const CollectionBooks = styled.div`
  display: flex;
  justify-content: center;
`;

const CollectionSmallSet = () => {
  return (
    <CollectionSmallSetContainer>
      <CollectionSetTitle title="나의 컬렉션" isMyCollection={true} />
      <CollectionBooks>
        <CollectionSmallBooks title="재밌는 책 컬렉션" />
        <CollectionSmallBooks title="무서운 책 컬렉션" />
        <CollectionSmallBooks title="감동적인 책 컬렉션" />
        <CollectionSmallBooks title="설레는 책 컬렉션" />
      </CollectionBooks>
    </CollectionSmallSetContainer>
  );
};

export default CollectionSmallSet;
