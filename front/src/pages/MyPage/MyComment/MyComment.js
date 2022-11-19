import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from './Nav';
// import Content from './Content';
import Container from '@mui/material/Container';
// import ContentScroll from './ContentScroll';
import FixContentScroll from './FixContentScroll';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';
import styled from 'styled-components';

const Void = styled.div`
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MyComment = () => {
  const CommentData = useSelector((state) =>
    state.myComment.data.length !== 0
      ? state.myComment.data.data.content
      : false
  );
  console.log(CommentData);

  // console.log(CommentData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetMyCommentList());
  }, [dispatch]);

  return (
    <PageContainer header footer>
      {/* xs , sm, md, lg, xl 사이즈 */}

      {CommentData ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav></Nav>
          <FixContentScroll commentData={CommentData}></FixContentScroll>
          {/* <ContentScroll commentData={CommentData}></ContentScroll>
          <Content commentData={CommentData}></Content> */}
        </Container>
      ) : (
        <Container maxWidth="md">
          <Header></Header>
          <Void>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
              alt="loading"
            />
          </Void>
        </Container>
      )}
    </PageContainer>
  );
};

export default MyComment;
