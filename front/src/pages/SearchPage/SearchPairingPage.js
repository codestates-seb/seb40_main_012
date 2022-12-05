import { PageContainer } from 'containers';
import SearchTab from './SearchTab';
import SearchPairings from './Pairing/SearchPairings';

const SearchPairingPage = () => {
  return (
    <PageContainer footer>
      <SearchTab />
      <SearchPairings />
    </PageContainer>
  );
};

export default SearchPairingPage;
