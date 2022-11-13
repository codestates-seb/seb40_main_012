import PageContainer from '../../components/PageContainer';
import CollectionHeader from './CollectionHeader';
import CollectionSmallSet from './CollectionSmallSet/CollectionSmallSet';

const CollectionPage = () => {
  return (
    <PageContainer footer>
      <CollectionHeader />
      <CollectionSmallSet />
    </PageContainer>
  );
};

export default CollectionPage;
