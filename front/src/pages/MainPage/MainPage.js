import PageContainer from '../../components/PageContainer';
import MainBooks from './MainBooks';
import BestBooks from './BestBooks';
import UserBooks from './UserBooks';
import BestCollections from './BestCollections';

const MainPage = () => {
  return (
    <PageContainer footer>
      <MainBooks />
      <BestBooks />
      <UserBooks nickname="김뫄뫄" />
      <BestCollections />
    </PageContainer>
  );
};

export default MainPage;
