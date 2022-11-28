import { PageContainer } from 'containers';
import SearchTab from './SearchTab';
import SearchBooks from './Book/SearchBooks';

const SearchBookPage = () => {
  return (
    <PageContainer footer>
      <SearchTab />
      <SearchBooks />
    </PageContainer>
  );
};

export default SearchBookPage;
