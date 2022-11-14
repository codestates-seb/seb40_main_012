import PageContainer from '../../components/PageContainer';
import CollectionHeader from './CollectionHeader';
import CollectionSmallSet from './CollectionSmallSet/CollectionSmallSet';
import CollectionMediumSet from './CollectionMediumSet/CollectionMediumSet';

const CollectionPage = () => {
  return (
    <PageContainer footer>
      <CollectionHeader />
      <CollectionSmallSet />
      <CollectionMediumSet title="감자님의 취향에 맞는 SF 소설 컬렉션" />
      <CollectionMediumSet title="다가오는 겨울에 대비하는 에세이 컬렉션" />
    </PageContainer>
  );
};

export default CollectionPage;
