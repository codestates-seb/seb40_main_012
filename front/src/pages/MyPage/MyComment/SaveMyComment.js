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

// 페이지네이션 처럼, 페이지네이션 요청하는 쿼리 string

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
  const [content, setContent] = useState({
    bookComment: [],
    pairingComment: [],
    collectionComment: [],
    hasMore: true,
    listCount: 7,
  });

  const fetchData = async () => {
    axios
      .get(COMMENT_URL)
      .then((response) => {
        console.log(response);
        setContent({
          bookComment: response.data.bookComment,
          pairingComment: response.data.pairingComment,
          collectionComment: response.data.collectionComment,
          hasMore: true,
          listCount: 0,
        });
      })
      .catch((error) => console.log('에러', error));
  };

  const dataArray = content.bookComment
    .concat(content.pairingComment)
    .concat(content.collectionComment);

  useEffect(() => {
    fetchData();
  }, []);

  console.log('content확인', content);
  console.log('dataArray', dataArray);
  return (
    <Scroll>
      <PageContainer header footer>
        {content ? (
          <Container maxWidth="md">
            <Header></Header>
            <Nav view={view} setView={setView} content={content}></Nav>
            <Content
              commentLength={content.listCount}
              dataArray={dataArray}
              content={content}
              setContent={setContent}
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
              더 읽어올 데이터가 없군요 📕
            </Void>
          </Container>
        )}
      </PageContainer>
    </Scroll>
  );
};

export default MyComment;
