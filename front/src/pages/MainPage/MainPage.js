import PageContainer from '../../components/PageContainer';
import Guide from './Guide';
import MainBooks from './MainBooks';
import BestBooks from './BestBooks';
import UserBooks from './UserBooks';
import BestCollections from './BestCollections';
import BestPairings from './BestPairings';

const MainPage = () => {
  return (
    <PageContainer footer>
      <MainBooks />
      <Guide />
      <BestBooks />
      <UserBooks nickname="김뫄뫄" />
      <BestCollections />
      <BestPairings />
    </PageContainer>
  );
};

export default MainPage;
