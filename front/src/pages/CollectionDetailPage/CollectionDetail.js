import styled from 'styled-components';
import { PageContainer } from 'containers';
import CollectionDetailHeader from './CollectionDetailHeader';
import { DeleteEditBtns, CollectionHeaderBtns } from './CollectionHeaderBtns';
import CollectionIntro from './CollectionIntro';
import CollectionDetailBooks from './CollectionDetailBooks';
import Comments from '../../components/Comments/Comments';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { ToDateString } from '../../util/ToDateString';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/modules/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CollectionTagBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  padding: 10px 0;
  flex-wrap: wrap;
`;

const CollectionDetailPage = () => {
  const [collectionData, setCollectionData] = useState({
    lastModifiedAt: '',
    tags: [],
    books: [],
    comments: [],
  });
  const { collectionId } = useParams();
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    getCollectionData(collectionId);
  }, []);

  const getCollectionData = (collectionId) => {
    //컬렉션 데이터 GET
    axios
      .get(`/api/collections/${collectionId}`)
      .then((res) => {
        setCollectionData(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleCollectionLike = () => {
    //컬렉션 좋아요
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

  const handleCollectionBookmark = () => {
    //컬렉션 북마크
    if (isLogin) {
      //로그인했을 때만 동작
      axios
        .post(`/api/collections/${collectionId}/bookmark`)
        .then(() => {
          getCollectionData(collectionId);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCollectionDelete = () => {
    //컬렉션 삭제
    axios.delete(`/api/collections/${collectionId}`).then(() => {
      navigate('/collection');
    });
  };

  const handleCommentAdd = (body) => {
    axios
      .post(`/api/collections/${collectionId}/comments/add`, {
        body,
      })
      .then(() => {
        getCollectionData(collectionId);
      })
      .catch((error) => console.error(error));
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`/api/comments/${commentId}/delete`)
      .then(() => {
        getCollectionData(collectionId);
      })
      .catch((error) => console.error(error));
  };

  const handleCommentEdit = (commentId, body) => {
    axios
      .patch(`/api/comments/${commentId}/edit`, {
        body,
      })
      .then(() => {
        getCollectionData(collectionId);
      })
      .catch((error) => console.error(error));
  };

  const handleCommentLike = (commentId) => {
    axios
      .patch(`/api/comments/${commentId}/like`)
      .then(() => {
        getCollectionData(collectionId);
      })
      .catch((error) => console.error(error));
  };

  const handleCommentDislike = (commentId) => {
    axios
      .patch(`/api/comments/${commentId}/dislike`)
      .then(() => {
        getCollectionData(collectionId);
      })
      .catch((error) => console.error(error));
  };

  return (
    <PageContainer footer>
      <CollectionDetailHeader
        title={collectionData.title}
        writer={collectionData.collectionAuthor}
        update={ToDateString(collectionData.lastModifiedAt)}
        taglist={collectionData.tags}
      />
      <CollectionTagBtn>
        <DeleteEditBtns
          userCollection={collectionData.userCollection}
          handleCollectionDelete={handleCollectionDelete}
        />
        <CollectionHeaderBtns
          likeCount={collectionData.likeCount}
          userLike={collectionData.userLike}
          userBookmark={collectionData.userBookmark}
          userCollection={collectionData.userCollection}
          handleCollectionLike={handleCollectionLike}
          handleCollectionBookmark={handleCollectionBookmark}
          handleCollectionDelete={handleCollectionDelete}
        />
      </CollectionTagBtn>
      <CollectionIntro intro={collectionData.content} />
      <CollectionDetailBooks books={collectionData.books} />
      <Comments
        commentsData={collectionData.comments}
        commentAdd={handleCommentAdd}
        commentDelete={handleCommentDelete}
        commentEdit={handleCommentEdit}
        commentLike={handleCommentLike}
        commentDislike={handleCommentDislike}
      />
    </PageContainer>
  );
};

export default CollectionDetailPage;
