import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from '../Nav';
import Content from './Content';
import Container from '@mui/material/Container';
import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';
import axios from '../../../api/axios';
import { COMMENT_URL } from '../../../api/requests';
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
    listCount: 0,
  });
  const [data, setData] = useState({
    content: [],
    hasMore: true,
  });

  const [infiniteData, setInfiniteData] = useState({
    bookComment: [],
    pairingComment: [],
    collectionComment: [],
    hasMore: true,
  });

  const fetchData = async () => {
    axios
      .get(COMMENT_URL)
      .then((response) => {
        setInfiniteData({
          bookComment: response.data.bookComment,
          pairingComment: response.data.pairingComment,
          collectionComment: response.data.collectionComment,
          hasMore: true,
        });
      })
      .catch((error) => console.log('에러', error));
  };
  const dataArray = infiniteData.bookComment
    .concat(infiniteData.pairingComment)
    .concat(infiniteData.collectionComment);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    makeLength();
  }, [infiniteData]);

  useEffect(() => {
    console.log('infiniteData 변경', infiniteData);
  }, [infiniteData]);

  useEffect(() => {
    setData({ content: dataArray, hasMore: true });
  }, [infiniteData]);

  const makeLength = () => {
    setContent({
      listCount:
        infiniteData.bookComment.length +
        infiniteData.pairingComment.length +
        infiniteData.collectionComment.length,
    });
  };

  console.log('data content 읽기', data.content);

  return (
    <PageContainer header footer>
      {content ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Content
            commentLength={content.listCount}
            dataArray={dataArray}
            data={data}
            setData={setData}
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
            데이터가 없습니다
          </Void>
        </Container>
      )}
    </PageContainer>
  );
};

export default MyComment;
