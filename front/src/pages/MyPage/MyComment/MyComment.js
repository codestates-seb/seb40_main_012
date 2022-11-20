import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from './Nav';

import Container from '@mui/material/Container';

import FixContentScroll from './FixContentScroll';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';
import styled from 'styled-components';
import HoverDelete from './HoverDelete';

const Void = styled.div`
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 200px;
    height: 200px;
  }
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
          <HoverDelete commentData={CommentData}></HoverDelete>
          <FixContentScroll commentData={CommentData}></FixContentScroll>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Header></Header>
          <Void>
            <img
              src={'/images/cherrypick_loading.gif'}
              alt="loading cherrypick"
            ></img>
          </Void>
        </Container>
      )}
    </PageContainer>
  );
};

export default MyComment;
