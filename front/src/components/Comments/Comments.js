import { useSelector } from 'react-redux';
import { selectEmail, selectIsLogin } from '../../store/modules/authSlice';
import styled from 'styled-components';
import CommentsHeader from './CommentsHeader';
import Comment from './Comment';
import CommentAdd from './CommentAdd';

const CommentsContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

//TODO: comment dislike 기능 추가
const Comments = ({
  commentsData,
  commentAdd,
  commentDelete,
  commentEdit,
  commentLike,
  commentDislike,
}) => {
  const userEmail = useSelector(selectEmail);
  const isLogin = useSelector(selectIsLogin);

  return (
    <CommentsContainer>
      <CommentsHeader cnt={commentsData.length} />
      {commentsData.map((el) => {
        return (
          <Comment
            key={el.commentId}
            isLogin={isLogin}
            commentId={el.commentId}
            userEmail={userEmail}
            data={el}
            commentDelete={commentDelete}
            commentEdit={commentEdit}
            commentLike={commentLike}
            commentDislike={commentDislike}
          />
        );
      })}
      <CommentAdd commentAdd={commentAdd} />
    </CommentsContainer>
  );
};

export default Comments;
