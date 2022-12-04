import { PageContainer } from 'containers';
import SearchTab from './SearchTab';

const SearchPairingPage = () => {
  return (
    <PageContainer footer>
      <SearchTab />
      <div>페어링</div>
    </PageContainer>
  );
};

export default SearchPairingPage;
