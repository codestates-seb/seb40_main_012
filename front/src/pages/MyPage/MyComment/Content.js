/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import InfiniteScroll from 'react-infinite-scroll-component';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MyCommentDetail from './MyCommentDetail';
// import { useState } from 'react';
import axios from '../../../api/axios';

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
  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    if (content.listCount >= 100) {
      // setContent({
      //   bookComment: content.bookComment,
      //   pairingComment: content.pairingComment,
      //   collectionComment: content.collectionComment,
      //   hasMore: false,
      //   listCount: 0,
      // });
      // return;
    }
    if (content.listCount < 10) {
      // setContent({
      //   bookComment: content.bookComment,
      //   pairingComment: content.pairingComment,
      //   collectionComment: content.collectionComment,
      //   hasMore: false,
      //   listCount: 0,
      // });
      // return;
    }

    //content.data 배열

    ////// 나중에 통신하는 거 붙여주기
    // setTimeout(() => {
    //   setInfiniteData({
    //     bookComment: infiniteData.bookComment.concat(infiniteData.bookComment),
    //     pairingComment: infiniteData.pairingComment.concat(
    //       infiniteData.pairingComment
    //     ),
    //     collectionComment: infiniteData.collectionComment.concat(
    //       infiniteData.collectionComment
    //     ),
    //     hasMore: true,
    //   });
    // }, 800);
    setTimeout(() => {
      setContent({
        data: content.data.concat(content.data),
        listCount: 0,
      });
    }, 800);
    /////
  };

  const removeAll = () => {
    if (window.confirm(`모든 데이터를 정말 삭제하시겠습니까?`)) {
      axios
        .delete(`api/comments/delete`)
        .then(() => fetchData())
        .catch((error) => console.log('에러', error));
    }
  };
  console.log('hasmore상태', content.hasMore);

  return (
    <>
      <ContentContainer>
        <Grid container>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 1 }}>
            {/* <CommentContainer></CommentContainer> */}
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
          dataLength={content.listCount}
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
              <img
                src={'/images/cherrypick_loading.gif'}
                alt="loading cherrypick"
              ></img>
              <div>열심히 읽어오는 중..</div>
            </div>
          }
          height={400}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yayy! 모든 코멘트를 다 읽었어요!</b>
            </p>
          }
        >
          <div>
            {content.data
              ? content.data.map((data) => (
                  <MyCommentDetail
                    key={data.commentId}
                    data={data}
                    fetchData={fetchData}
                  />
                ))
              : null}
          </div>
        </InfiniteScroll>
      </ContentContainer>
    </>
  );
};
export default Content;
