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
import { MY_COLLECTION_URL } from '../../../api/requests';
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

const MyPairing = () => {
  console.log('마이페어링 시작');
  const [view, setView] = useState(3);
  const [content, setContent] = useState({
    listCount: '',
    data: [],
  });
  const [infiniteData, setInfiniteData] = useState({
    content: {
      data: [],
    },
    hasMore: true,
  });

  const fetchData = async () => {
    axios
      .get(MY_COLLECTION_URL)
      .then((response) => {
        setContent(response.data);
        console.log('state 현재값', content);
        console.log('response데이터', response);
        setInfiniteData({
          content: response.data,
          hasMore: true,
        });
      })
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    fetchData();
    console.log('useEffect의 state 현재값', content);
  }, []);

  useEffect(() => {
    console.log('infiniteData 변경', infiniteData);
  }, [infiniteData]);

  console.log('state 현재값', content);

  return (
    <PageContainer header footer>
      {content.data.length !== 0 ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Content
            view={view}
            setView={setView}
            content={content}
            setInfiniteData={setInfiniteData}
            infiniteData={infiniteData}
          ></Content>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Void>
            <img
              src={'/images/cherrypick_loading.gif'}
              alt="loading cherrypick"
            ></img>
            데이터가 없어용
          </Void>
        </Container>
      )}
    </PageContainer>
  );
};

export default MyPairing;
