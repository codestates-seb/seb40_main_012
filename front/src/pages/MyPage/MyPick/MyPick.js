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
import { MY_PICK_BOOK } from '../../../api/requests';
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

const MyPick = () => {
  console.log('마이픽 시작');
  const [view, setView] = useState(4);
  const [content, setContent] = useState({
    data: [],
  });

  // 책 북마크 데이터 가져오기
  const fetchData = async () => {
    axios
      .get(MY_PICK_BOOK)
      .then((response) => {
        console.log('then?', response);
        setContent({
          data: response.data.data,
          content,
        });
      })
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Scroll>
      <PageContainer header footer>
        {content ? (
          <Container maxWidth="md">
            <Header></Header>
            <Nav view={view} setView={setView}></Nav>
            <Content content={content}></Content>
          </Container>
        ) : (
          <Container maxWidth="md">
            <Header></Header>
            <Nav view={view} setView={setView}></Nav>
            <Void>
              <img src={'/images/spinner.gif'} alt="loading cherrypick"></img>더
              읽어올 데이터가 없군요 📕
            </Void>
          </Container>
        )}
      </PageContainer>
    </Scroll>
  );
};

export default MyPick;
