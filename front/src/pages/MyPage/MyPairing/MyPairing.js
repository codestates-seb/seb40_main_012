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
import { MY_PAIRING_URL } from '../../../api/requests';
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

const MyPairing = () => {
  console.log('마이페어링 시작');
  const [view, setView] = useState(2);
  const [content, setContent] = useState({
    data: [],
  });
  const [lastId, setLastId] = useState();

  const fetchData = async () => {
    axios
      .get(MY_PAIRING_URL)
      .then((response) => {
        setContent({
          data: response.data.data.content,
        });
        setLastId(
          response.data.data.content[response.data.data.content.length - 1]
            .pairingId
        );
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
            <Content
              content={content}
              setContent={setContent}
              fetchData={fetchData}
              lastId={lastId}
              setLastId={setLastId}
            ></Content>
          </Container>
        ) : (
          <Container maxWidth="md">
            <Header></Header>
            <Nav view={view} setView={setView} content={content}></Nav>
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

export default MyPairing;
