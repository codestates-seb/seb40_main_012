/*eslint-disable*/
import Header from '../Header';
import { PageContainer } from 'containers';
import Nav from '../Nav';
import Content from './Content';
import Container from '@mui/material/Container';
import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';
import axios from '../../../api/axios';
import { COMMENT_URL } from '../../../api/requests';
import Scroll from '../Scroll';

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

const MyComment = () => {
  console.log('마이코멘트 시작');
  const [view, setView] = useState(1);

  // commentCount: 0,
  // commentId: 0,
  // contentId: 0,
  // likeCount: 0,
  // title: '',
  // cover: '',
  // collectionCover: null,
  // myBookRating: 0,
  // author: '',
  // commentType: '',
  // body: '',
  // createdAt: '',
  // hasMore: false,
  // listCount: 0,

  const [content, setContent] = useState({
    data: [],
    listCount: 0,
  });

  const fetchData = async () => {
    axios
      .get(COMMENT_URL)
      .then((response) => {
        console.log('response확인', response.data);
        setContent({
          data: response.data.data,
          listCount: response.data.listCount,
        });
        // author: response.data.data.author,
        // body: response.data.data.body,
        // collectionCover: response.data.data.collectionCover,
        // commentCount: response.data.data.commentCount,
        // commentId: response.data.data.commentId,
        // commentType: response.data.data.commentType,
        // contentId: response.data.data.contentId,
        // cover: response.data.data.cover,
        // createdAt: response.data.data.createdAt,
        // likeCount: response.data.data.likeCount,
        // myBookRating: response.data.data.myBookRating,
        // title: response.data.data.title,
        // hasMore: false,
        // listCount: 0,
      })
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('나와랑', content);
  return (
    <Scroll>
      <PageContainer header footer>
        {/* {content ? ( */}
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Content content={content} setContent={setContent}></Content>
        </Container>
        {/* ) : (
          <Container maxWidth="md">
            <Header></Header>
            <Void>
              <img
                src={'/images/cherrypick_loading.gif'}
                alt="loading cherrypick"
              ></img>
              더 읽어올 데이터가 없군요 📕
            </Void>
          </Container>
        )} */}
      </PageContainer>
    </Scroll>
  );
};

export default MyComment;
