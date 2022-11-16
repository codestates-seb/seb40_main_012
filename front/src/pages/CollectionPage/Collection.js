import PageContainer from '../../components/PageContainer';
import CollectionHeader from './CollectionHeader';
import CollectionSmallSet from './CollectionSmallSet/CollectionSmallSet';
import CollectionMediumSet from './CollectionMediumSet/CollectionMediumSet';
import CollectionLargeSet from './CollectionLargeSet/CollectionLargeSet';

const CollectionPage = () => {
  return (
    <PageContainer footer>
      <CollectionHeader />
      <CollectionSmallSet />
      <CollectionMediumSet title="감자님의 취향에 맞는 SF 소설 컬렉션" />
      <CollectionMediumSet title="다가오는 겨울에 대비하는 에세이 컬렉션" />
      <CollectionLargeSet title="화제의 감독 박감자의 작품 컬렉션" />
      <CollectionLargeSet title="웹툰 이제 책으로 보자" />
    </PageContainer>
  );
};

export default CollectionPage;
