/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MyPairingDetail from './MyPairingDetail';
import { useEffect, useState } from 'react';
import { BasicButton } from '../../../components/Buttons';

const ContentContainer = styled.div`
  margin-bottom: 10rem;

  img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100px;
    height: 100px;
  }
  .fixed {
    position: fixed;
  }
  p {
    text-align: center;
  }
  .no-data-notice {
    text-align: center;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonCSS = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
`;

const Content = ({
  content,
  setContent,
  fetchData,
  lastId,
  setLastId,
  hasMore,
  setHasMore,
}) => {
  const navigate = useNavigate();

  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    setTimeout(() => {
      if (hasMore === true && lastId) {
        axios
          .get(`/api/mypage/userPairing?lastId=${lastId}`)
          .then((response) => {
            setContent({
              data: content.data.concat(response.data.data.content),
              size: response.data.data.size,
            });
            setHasMore(response.data.data.size < 5 ? false : true);
            {
              response.data.data.size >= 5
                ? setLastId(
                    response.data.data.content[
                      response.data.data.content.length - 1
                    ].pairingId
                  )
                : null;
            }
          })
          .catch((error) => console.log('에러', error));
      }
    }, 500);
  };

  const removeAll = () => {
    if (window.confirm(`모든 페어링을 정말 삭제하시겠습니까?`)) {
      axios
        .delete(`/api/books/pairings/delete`)
        .then(() => fetchData())
        .catch((error) => console.log('에러', error));
    }
  };

  useEffect(() => {
    setHasMore(content.data.length < 5 ? false : true);
  }, []);

  return (
    <>
      <ContentContainer>
        <Grid container>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 1 }}></Grid>

          <Grid
            item
            xs={6.5}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <ButtonCSS onClick={removeAll}>
              <Typography
                color="#737373"
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  mt: 1,
                  mb: 1,
                }}
                variant="body2"
                component={'span'}
              >
                전체 삭제
              </Typography>
            </ButtonCSS>
          </Grid>
        </Grid>

        {content.data.length ? (
          <InfiniteScroll
            dataLength={content.data.length}
            // dataLength={data.content.length}
            // next={data.content && fetchMoreData}
            // size 속성으로 측정 가능 .
            next={fetchMoreData}
            hasMore={hasMore} // 스크롤 막을지 말지 결정
            loader={
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <img src={'/images/spinner.gif'} alt="loading cherrypick"></img>
                <Typography
                  color="#737373"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 1,
                    mb: 1,
                    fontSize: 17,
                    fontWeight: 300,
                  }}
                  variant="body2"
                  component={'span'}
                >
                  열심히 읽어오는 중..
                </Typography>
              </div>
            }
            height={400}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    mt: 1,
                    mb: 1,
                    fontSize: 17,
                    fontWeight: 300,
                  }}
                  color="#2e3031"
                  variant="body2"
                  gutterBottom
                  component={'span'}
                >
                  모든 페어링을 다 읽었어요!
                </Typography>
              </p>
            }
          >
            <div>
              {content.data ? (
                content.data?.map((data) => (
                  <MyPairingDetail
                    key={data.pairingId}
                    data={data}
                    fetchData={fetchData}
                  />
                ))
              ) : (
                <Typography
                  color="#737373"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 1,
                    mb: 1,
                    fontSize: 17,
                    fontWeight: 300,
                  }}
                  variant="body2"
                  component={'span'}
                >
                  데이터가 없어요
                </Typography>
              )}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="no-data-notice">
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                fontSize: 17,
                fontWeight: 300,
              }}
              color="#2e3031"
              variant="body2"
              gutterBottom
              component={'span'}
            >
              읽어올 데이터가 없습니다
              <br />새 페어링을 작성해보세요!
              <br />
              <br />
              <BasicButton onClick={() => navigate(`/pairing`)}>
                페어링 페이지
              </BasicButton>
            </Typography>
          </div>
        )}
      </ContentContainer>
    </>
  );
};
export default Content;
