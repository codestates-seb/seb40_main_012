import styled from 'styled-components';

const CommentsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  .comment {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-right: 5px;
    @media screen and (max-width: 500px) {
      font-size: 16px;
    }
  }
  .cnt {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray};
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  @media screen and (max-width: 640px) {
    padding: 10px;
  }
`;

const CommentsHeader = ({ cnt = 0 }) => {
  return (
    <CommentsHeaderContainer>
      <div className="comment">댓글</div>
      <div className="cnt">{cnt}</div>
    </CommentsHeaderContainer>
  );
};

export default CommentsHeader;
