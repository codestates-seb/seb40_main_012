import styled from 'styled-components';
import CommentsHeader from './CommentsHeader';
import Comment from './Comment';

const CommentsContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Comments = ({ commentsData }) => {
  console.log(commentsData);
  return (
    <CommentsContainer>
      <CommentsHeader cnt={commentsData.length} />
      {commentsData.map((el) => {
        return <Comment key={el.commentId} data={el} />;
      })}
    </CommentsContainer>
  );
};

export default Comments;
