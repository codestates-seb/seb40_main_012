import Header from '../Header';
import { PageContainer } from 'containers';
import Nav from '../Nav';
import Content from './Content';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { MY_COLLECTION_URL } from '../../../api/requests';
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

const MyCollection = () => {
  const [view, setView] = useState(3);
  const [content, setContent] = useState({
    data: [],
  });
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      axios.get(MY_COLLECTION_URL).then((response) => {
        setContent({
          data: response.data.data.content,
        });
      });
    } catch (error) {
      const { message } = error;
      dispatch(
        setOpenSnackbar({
          severity: 'error',
          message: message,
        })
      );
    }
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
            <Content></Content>
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

export default MyCollection;
