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
import {
  MY_PICK_BOOK,
  MY_PICK_PAIRING,
  MY_PICK_COLLECTION,
} from '../../../api/requests';
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

const MyPick = () => {
  console.log('마이픽 시작');
  const [view, setView] = useState(4);
  const [content, setContent] = useState({
    data: [],
  });

  const [pairingContent, setPairingContent] = useState({
    data: [],
  });

  const [collectionContent, setCollectionContent] = useState({
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
        });
      })
      .catch((error) => console.log('에러', error));
  };

  // 페어링 북마크 데이터 가져오기
  const fetchPairingData = async () => {
    axios
      .get(MY_PICK_PAIRING)
      .then((response) => {
        setPairingContent({
          data: response.data.data,
        });
      })
      .catch((error) => console.log('에러', error));
  };
  console.log('pairingContent 현재값', pairingContent);

  // 컬렉션 북마크 데이터 가져오기
  const fetchCollectionData = async () => {
    axios
      .get(MY_PICK_COLLECTION)
      .then((response) => {
        setCollectionContent({
          data: response.data.data,
        });

        console.log('collectionContent 현재값', collectionContent);
      })

      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    // fetchDataTest();
    fetchPairingData();
    fetchData();
    fetchCollectionData();
  }, []);

  return (
    <Scroll>
      <PageContainer header footer>
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView}></Nav>
          <Content
            content={content}
            setContent={setContent}
            pairingContent={pairingContent}
            setPairingContent={setPairingContent}
            collectionContent={collectionContent}
            setCollectionContent={setCollectionContent}
            fetchCollectionData={fetchCollectionData}
            fetchPairingData={fetchPairingData}
            fetchData={fetchData}
          ></Content>
        </Container>
      </PageContainer>
    </Scroll>
  );
};

export default MyPick;
