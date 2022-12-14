import { PageContainer } from 'containers';
import SearchTab from './SearchTab';
import SearchCollections from './Collection/SearchCollections';

const SearchCollectionPage = () => {
  return (
    <PageContainer footer>
      <SearchTab />
      <SearchCollections />
    </PageContainer>
  );
};

export default SearchCollectionPage;
