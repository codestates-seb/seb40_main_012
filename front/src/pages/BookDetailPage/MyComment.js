import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${({ theme }) => theme.colors.purple_1};
  margin: 10px 0px;
  border-radius: 5px;
`;

const MyComment = ({ myRating, myComment }) => {
  return (
    <Wrapper>
      <div>★ {myRating}</div>
      <div>{myComment?.body}</div>
      <div>{myComment?.modifiedAt}</div>
    </Wrapper>
  );
};

export default MyComment;
