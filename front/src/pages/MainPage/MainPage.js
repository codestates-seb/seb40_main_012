import { PageContainer } from 'containers';
import MainBooks from './MainBooks';
import BestBooks from './BestBooks';
import UserBooks from './UserBooks';
import BestCollections from './BestCollections';
import BestPairings from './BestPairings';
import MainInformation from './MainInformation';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyword } from 'store/modules/searchSlice';
import { selectIsLogin, selectnickName } from '../../store/modules/authSlice';

const MainPage = () => {
  const isLogin = useSelector(selectIsLogin);
  const userNickname = useSelector(selectnickName);
  const dispatch = useDispatch();
  dispatch(setSearchKeyword({ keyword: '' }));

  return (
    <PageContainer footer>
      <MainBooks />
      <MainInformation />
      <BestBooks />
      {isLogin ? <UserBooks nickname={userNickname} /> : null}
      <BestCollections />
      <BestPairings />
    </PageContainer>
  );
};

export default MainPage;
