import { PageContainer } from 'containers';
import CollectionHeader from './CollectionHeader';
import CollectionSmallSet from './CollectionSmallSet/CollectionSmallSet';
import CollectionMediumSet from './CollectionMediumSet/CollectionMediumSet';
import CollectionLargeSet from './CollectionLargeSet/CollectionLargeSet';
import BestCollections from 'pages/MainPage/BestCollections';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLogin, selectnickName } from '../../store/modules/authSlice';
import { setSearchKeyword } from 'store/modules/searchSlice';

const CollectionPage = () => {
  const isLogin = useSelector(selectIsLogin);
  const nickName = useSelector(selectnickName);
  const dispatch = useDispatch();
  dispatch(setSearchKeyword({ keyword: '' }));

  return (
    <PageContainer footer>
      <CollectionHeader />
      <CollectionSmallSet />
      {isLogin ? (
        <CollectionMediumSet
          title={`${nickName}님의 취향에 맞는 추천 컬렉션`}
          type="recommend"
          nickName={nickName}
        />
      ) : null}
      {isLogin ? <BestCollections /> : null}
      <CollectionMediumSet
        title="다가오는 겨울에 대비하는 에세이 컬렉션"
        type="curation"
      />
      <CollectionLargeSet type="author" />
      <CollectionLargeSet type="critic" />
    </PageContainer>
  );
};

export default CollectionPage;
