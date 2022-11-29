/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MyPairingDetail from './MyPairingDetail';
import { useState } from 'react';

const ContentContainer = styled.div`
  margin-bottom: 10rem;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    margin-top: -0.1px;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #cfc3ff;
    }
  }
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
`;
const BookImg = styled.div`
  .resize {
    box-sizing: inherit;
    width: 108px !important;
    height: 164px !important;
    margin-left: 10px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;
  .comment {
    height: 125px;
    color: #232627;
  }
  .heart-star-title {
    display: flex;
    flex-direction: row;
  }
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

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #6741ff;
  }
`;

const ItemContainer = styled.div`
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const Content = ({ content, setContent, fetchData }) => {
  const [hasMore, setHasMore] = useState(true);

  // 그냥 콘솔로그 찍었을 때는 나오는데, lastId로 조회했을 때는 nan이 나오는 문제
  const [lastId, setLastId] = useState(
    content?.data[content?.data?.length - 1]?.pairingId
  );
  console.log(content?.data[content?.data?.length - 1]?.pairingId);

  console.log('마지막아이디', lastId);
  const [newContent, setNewContent] = useState({
    data: [],
  });
  console.log('hasMore', hasMore);
  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    // if (newContent.data.length < 5) {
    //   setHasMore(false);
    //   return;
    // }

    // 새로불러온 데이터를 state에 저장해서 그 데이터끼리 붙여야 함

    if (hasMore === true) {
      axios
        .get(`/api/mypage/userPairing?lastId=86`)
        // .get(`/api/mypage/userPairing?lastId=${lastId}`)

        .then((response) => {
          console.log('response.data.data.content', response.data.data.content);
          // 여기까진 들어옴
          setNewContent({
            data: response?.data.data.content,
          });
          console.log('newContent', newContent);
          // console.log('newContent', newContent.data);

          // setContent({
          //   data: content.data.concat(response.data.data.content),
          //   size: content.size,
          // });

          setContent({
            data: content?.data?.concat(newContent.data),
            size: content.size,
          });
          console.log('content.data', content.data);
          setHasMore(response.data.data.empty);
          setLastId(lastId - 5);
        })
        .catch((error) => console.log('에러', error));
    }

    /////
  };

  const removeAll = () => {
    if (window.confirm(`모든 데이터를 정말 삭제하시겠습니까?`)) {
      axios
        .delete(`/api/books/pairings/delete`)
        .then(() => fetchData())
        .catch((error) => console.log('에러', error));
    }
  };

  return (
    <>
      <ContentContainer>
        <Grid container>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 1 }}>
            <CommentContainer></CommentContainer>
          </Grid>

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

        <InfiniteScroll
          dataLength={content.data.length}
          // dataLength={data.content.length}
          // next={data.content && fetchMoreData}
          next={content && fetchMoreData}
          hasMore={true} // 스크롤 막을지 말지 결정
          loader={
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <img src={'/images/spinner.gif'} alt="loading cherrypick"></img>
              <div>열심히 읽어오는 중..</div>
            </div>
          }
          height={400}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yayy! 모든 페어링을 다 읽었어요!</b>
            </p>
          }
        >
          <div>
            {content.data ? (
              content.data.map((data) => (
                <MyPairingDetail
                  key={data.pairingId}
                  data={data}
                  fetchData={fetchData}
                />
              ))
            ) : (
              <div>데이터가 없어요</div>
            )}
          </div>
        </InfiniteScroll>
      </ContentContainer>
    </>
  );
};
export default Content;
