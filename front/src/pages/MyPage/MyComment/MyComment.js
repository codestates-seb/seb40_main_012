import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from '../Nav';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MY_PAIRING_URL } from '../../../api/requests';
import styled from 'styled-components';
import Content from './Content';
import axios from '../../../api/axios';

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
  const [view, setView] = useState(1);
  const [content, setContent] = useState({
    listCount: '',
    data: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      // ?.get(MY_PAIRING_URL, {
      //   headers: {
      //     Authorization:
      //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyLsnpHsl4Ug7IK07J2466eIIl0sImVtYWlsIjoic21pbGVfYW5nZWxAZW1haWwuY29tIiwic3ViIjoic21pbGVfYW5nZWxAZW1haWwuY29tIiwiaWF0IjoxNjY5MTgzNTQyLCJleHAiOjE2NjkxOTA3NDJ9.hosCCTfPDEK5bBmLTYufoyrflDMx1wXP_S5A7X3i8iY',
      //   },
      // })
      .get(MY_PAIRING_URL)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <PageContainer header footer>
      {content ? (
        <Container maxWidth="md">
          <Header></Header>
          <Nav view={view} setView={setView} content={content}></Nav>
          <Content view={view} setView={setView} content={content}></Content>
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
