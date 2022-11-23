import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import CollectionDetailHeader from './CollectionDetailHeader';
import CollectionTags from './CollectionTags';
import CollectionHeaderBtns from './CollectionHeaderBtns';
import CollectionIntro from './CollectionIntro';
import CollectionDetailBooks from './CollectionDetailBooks';
import Comments from '../../components/Comments/Comments';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { ToDateString } from '../../util/ToDateString';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectNickname } from '../../store/modules/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CollectionTagBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const commentsData = [
  {
    commentId: 1,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
  {
    commentId: 2,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
  {
    commentId: 3,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
];

const commentAdd = (content) => {
  console.log('comment 작성: ', content);
  //dispatch
};
const CollectionDetailPage = () => {
  const [collectionData, setCollectionData] = useState({
    lastModifiedAt: '',
    tags: [],
    books: [],
  });
  const [isMyCollection, setIsMyCollection] = useState(false);
  const { collectionId } = useParams();
  const isLogin = useSelector(selectIsLogin);
  const usernickName = useSelector(selectNickname);
  const navigate = useNavigate();

  useEffect(() => {
    getCollectionData(collectionId);
    if (collectionData.collectionAuthor === usernickName)
      setIsMyCollection(true);
  }, []);

  const getCollectionData = (collectionId) => {
    axios
      .get(`/api/collections/${collectionId}`)
      .then((res) => {
        console.log(res.data);
        setCollectionData(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleCollectionLike = () => {
    if (isLogin) {
      //로그인했을 때만 동작
      axios
        .post(`/api/collections/${collectionId}/like`)
        .then(() => {
          getCollectionData(collectionId);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCollectionDelete = () => {
    axios.delete(`/api/collections/${collectionId}`).then(() => {
      navigate('/collection');
      console.log('삭제');
    });
  };

  return (
    <PageContainer footer>
      <CollectionDetailHeader
        title={collectionData.title}
        writer={collectionData.collectionAuthor}
        update={ToDateString(collectionData.lastModifiedAt)}
      />
      <CollectionTagBtn>
        <CollectionTags taglist={collectionData.tags} />
        <CollectionHeaderBtns
          likeCount={collectionData.likeCount}
          userLike={collectionData.userLike}
          handleCollectionLike={handleCollectionLike}
          handleCollectionDelete={handleCollectionDelete}
        />
      </CollectionTagBtn>
      <CollectionIntro intro={collectionData.content} />
      <CollectionDetailBooks books={collectionData.books} />
      <Comments commentsData={commentsData} commentAdd={commentAdd} />
    </PageContainer>
  );
};

export default CollectionDetailPage;
