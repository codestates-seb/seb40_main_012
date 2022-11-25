import PageContainer from '../../components/PageContainer';
import CollectionHeader from './CollectionHeader';
import CollectionSmallSet from './CollectionSmallSet/CollectionSmallSet';
import CollectionMediumSet from './CollectionMediumSet/CollectionMediumSet';
import CollectionLargeSet from './CollectionLargeSet/CollectionLargeSet';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectnickName } from '../../store/modules/authSlice';

const CollectionPage = () => {
  const isLogin = useSelector(selectIsLogin);
  const nickName = useSelector(selectnickName);

  return (
    <PageContainer footer>
      <CollectionHeader />
      <CollectionSmallSet />
      {isLogin ? (
        <CollectionMediumSet
          title={`${nickName}님의 취향에 맞는 추천 컬렉션`}
        />
      ) : null}
      <CollectionMediumSet title="다가오는 겨울에 대비하는 에세이 컬렉션" />
      <CollectionLargeSet type="author" />
      <CollectionLargeSet type="critic" />
    </PageContainer>
  );
};

export default CollectionPage;
