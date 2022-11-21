import { useSelector } from 'react-redux';
import { selectEmail } from '../../store/modules/authSlice';
import styled from 'styled-components';
import CommentsHeader from './CommentsHeader';
import Comment from './Comment';
import CommentAdd from './CommentAdd';

const CommentsContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Comments = ({ commentsData, commentAdd, commentDelete }) => {
  const userEmail = useSelector(selectEmail);

  return (
    <CommentsContainer>
      <CommentsHeader cnt={commentsData.length} />
      {commentsData.map((el) => {
        return (
          <Comment
            key={el.commentId}
            commentId={el.commentId}
            data={el}
            commentDelete={commentDelete}
            userEmail={userEmail}
          />
        );
      })}
      <CommentAdd commentAdd={commentAdd} />
    </CommentsContainer>
  );
};

export default Comments;