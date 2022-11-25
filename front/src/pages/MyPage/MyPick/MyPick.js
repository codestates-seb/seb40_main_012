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
  COMMENT_URL,
} from '../../../api/requests';

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
    listCount: '',
    data: [],
    hasMore: true,
  });

  const [pairingContent, setPairingContent] = useState({
    listCount: '',
    data: [],
    hasMore: true,
  });

  const [collectionContent, setCollectionContent] = useState({
    listCount: '',
    data: [],
    hasMore: true,
  });

  const [infiniteData, setInfiniteData] = useState({
    data: [],
    hasMore: true,
  });

  /// 테스트용
  // const fetchDataTest = async () => {
  //   axios
  //     .get(COMMENT_URL)
  //     .then((response) => {
  //       console.log('response를 알아보장', response);
  //     })
  //     .catch((error) => console.log('에러', error));
  // };

  // 책 북마크 데이터 가져오기
  const fetchData = async () => {
    axios
      .get(MY_PICK_BOOK)
      .then((response) => {
        console.log('then?', response);
        setContent({
          listCount: response.data.listCount,
          data: response.data.data,
          hasMore: true,
        });
        console.log('확인', response);
        setInfiniteData({
          content: response.data,
          hasMore: true,
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
          listCount: response.data.listCount,
          data: response.data.data,
          hasMore: true,
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
          listCount: response.data.listCount,
          data: response.data.data,
          hasMore: true,
        });
        console.log('collectionContent 현재값', collectionContent);
      })
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    // fetchDataTest();
    fetchData();
    fetchPairingData();
    fetchCollectionData();
  }, []);

  useEffect(() => {
    console.log('infiniteData 변경', infiniteData);
  }, [infiniteData]);

  return (
    <PageContainer header footer>
      {content.data.length !== 0 ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Content
            content={content}
            setContent={setContent}
            pairingContent={pairingContent}
            setPairingContent={setPairingContent}
            collectionContent={collectionContent}
            setCollectionContent={setCollectionContent}
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
            데이터가 없습니다
          </Void>
        </Container>
      )}
    </PageContainer>
  );
};

export default MyPick;
