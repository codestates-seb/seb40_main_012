import Header from '../Header';
import { PageContainer } from 'containers';
import Nav from '../Nav';
import Content from './Content';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { MY_PAIRING_URL } from '../../../api/requests';
import Scroll from '../Scroll';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';
import { useDispatch } from 'react-redux';

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
  const [view, setView] = useState(2);
  const [content, setContent] = useState({
    data: [],
  });
  const [lastId, setLastId] = useState();
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      axios.get(MY_PAIRING_URL).then((response) => {
        setContent({
          data: response.data.data.content,
        });
        {
          response.data.data.content.length
            ? setLastId(
                response.data.data.content[
                  response.data.data.content.length - 1
                ].pairingId
              )
            : null;
        }
        setHasMore(response.data.data.size < 5 ? false : true);
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
    setHasMore(content.data.length < 5 ? false : true);
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
              setHasMore={setHasMore}
              hasMore={hasMore}
            ></Content>
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

export default MyPairing;
