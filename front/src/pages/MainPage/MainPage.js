import PageContainer from '../../components/PageContainer';
import MainBooks from './MainBooks';
import BestBooks from './BestBooks';
import UserBooks from './UserBooks';

const MainPage = () => {
  return (
    <PageContainer footer>
      <MainBooks />
      <BestBooks />
      <UserBooks nickname="김뫄뫄" />
    </PageContainer>
  );
};

export default MainPage;
