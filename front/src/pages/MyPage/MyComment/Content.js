import Grid from '@mui/material/Grid';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    width: 200px;
    height: 200px;
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

const Content = ({ content }) => {
  const saveData = content.data;
  const [data, setData] = useState({
    content: content.data,
    hasMore: true,
  });

  console.log('saveData ', saveData);
  // console.log('데이터 콘텐츠', data.content);
  // console.log('pairingLike', content.pairingLike);
  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    if (data.content.length >= 100) {
      setData({
        content: data.content,
        hasMore: false,
      });
      return;
    }
    if (data.content.length <= 10) {
      setData({
        content: data.content,
        hasMore: false,
      });
      return;
    }
    setTimeout(() => {
      setData({
        content: data.content.concat(data.content),
        hasMore: true,
      });
    }, 800);
  };

  const onRemove = (targetId) => {
    const newCommentList = data.content.filter(
      (el) => el.commentId !== targetId
    );
    setData({ content: newCommentList, hasMore: true });
  };

  const removeAll = () => {
    if (window.confirm(`모든 데이터를 정말 삭제하시겠습니까?`)) {
      setData({ content: [], hasMore: false });
    }
  };

  return (
    <>
      {data.content && (
        <ContentContainer>
          <Grid container xs={12}>
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
                  gutterBottom
                >
                  전체 삭제
                </Typography>
              </ButtonCSS>
            </Grid>
          </Grid>

          <InfiniteScroll
            dataLength={data.content.length}
            // dataLength={contentLength}
            next={data.content && fetchMoreData}
            hasMore={data.hasMore} // 스크롤 막을지 말지 결정
            loader={
              <p
                style={{
                  textAlign: 'center',
                }}
              >
                <img
                  src={'/images/cherrypick_loading.gif'}
                  alt="loading cherrypick"
                ></img>
              </p>
            }
            height={400}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div>
              {data.content.map((data, key) => (
                <ItemContainer key={key}>
                  <Grid
                    container
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Grid item xs={0.5} sx={{ width: 20 }}></Grid>

                    <Grid item xs={2}>
                      {data && (
                        <BookImg>
                          <img
                            className="resize"
                            src="https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300"
                            alt="book thumbnail"
                          ></img>
                        </BookImg>
                      )}
                    </Grid>
                    <Grid item xs={9}>
                      <FlexBox>
                        <Typography
                          color="#232627"
                          sx={{
                            height: 125,
                          }}
                          variant="body2"
                          gutterBottom
                        >
                          {data.content}
                        </Typography>

                        <div className="heart-star-title">
                          <Grid item xs={3}>
                            <StarBorderRoundedIcon
                              align="center"
                              style={{ color: 'FFF599' }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            sx={{
                              display: 'flex',

                              alignItems: 'center',
                            }}
                            color="#BFBFBF"
                          >
                            <FavoriteTwoToneIcon
                              sx={{ width: 19.5, height: 19.5 }}
                              align="center"
                              style={{ color: 'FFD8D8' }}
                            />
                            {data.pairingLike}
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row-reverse',
                            }}
                            align="right"
                            color="#737373"
                          >
                            <div>
                              {data.bookName}, {data.author}
                            </div>
                          </Grid>
                        </div>
                      </FlexBox>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                    >
                      <Remove
                        onClick={() => {
                          // 현재 작동 안됨 (코멘트 아이디 없음)
                          if (
                            window.confirm(
                              `${data.commentId}번째 코멘트를 삭제하시겠습니까?`
                            )
                          ) {
                            onRemove(data.commentId);
                          }
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </Remove>
                    </Grid>
                  </Grid>
                </ItemContainer>
              ))}
            </div>
          </InfiniteScroll>
        </ContentContainer>
      )}
    </>
  );
};
export default Content;
