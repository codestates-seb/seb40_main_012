import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const CommentsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  .comment {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-right: 5px;
  }
  .cnt {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray};
  }
  //border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const CommentsHeader = ({ cnt }) => {
  return (
    <ThemeProvider theme={theme}>
      <CommentsHeaderContainer>
        <div className="comment">댓글</div>
        <div className="cnt">{cnt}</div>
      </CommentsHeaderContainer>
    </ThemeProvider>
  );
};

export default CommentsHeader;
