import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from '../Nav';
import Content from './Content';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';

const Void = styled.div`
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100px;
    height: 100px;
  }
`;

const MyCollection = () => {
  const [view, setView] = useState(2);
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
      {CommentData ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} CommentData={CommentData}></Nav>
          <Content
            view={view}
            setView={setView}
            commentData={CommentData}
          ></Content>
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

export default MyCollection;
