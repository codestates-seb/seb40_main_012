/*eslint-disable*/

import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

const Remove = styled.div`
  color: #dee2e6;
  opacity: 0;
`;

const RemoveButton = styled.button`
  all: unset;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  &:hover {
    ${Remove} {
      opacity: 0.3;
      img {
        width: 17px;
        height: 17px;
        margin-right: 5px;
        margin-top: 8px;
      }
    }
  }
`;

const BookImg = styled.div`
  cursor: pointer;
  .resize {
    box-sizing: inherit;
    width: 108px !important;
    height: 164px !important;
    margin-left: 10px;
  }
  .resize-book {
    box-sizing: inherit;
    width: 112px !important;
    height: 158px !important;
    padding: 10px !important;
    margin-left: 8px;
    filter: drop-shadow(3px 3px 3px rgb(93 93 93 / 80%));
    /* background-color: navy; */
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;

  cursor: pointer;
  .comment {
    height: 125px;
    color: #232627;
  }
  .heart-star-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
  .title {
    :hover {
      color: #b09dff;
      transition: color 0.5s;
    }
  }
`;

const MyPickBook = ({ content, fetchData }) => {
  console.log('받아온콘텐츠', content);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);

  // 그냥 콘솔로그 찍었을 때는 나오는데, lastId로 조회했을 때는 nan이 나오는 문제
  const [lastId, setLastId] = useState(
    content?.data?.content[content?.data?.content?.length - 1]?.bookmarkId
  );
  console.log(
    content?.data?.content[content?.data?.content?.length - 1]?.bookmarkId
  );

  console.log('마지막아이디', lastId);
  const [newContent, setNewContent] = useState({
    data: [],
  });
  console.log('hasMore', hasMore);

  // console.log('data는어디에 ', data);

  const onRemove = (id) => {
    axios
      .post(`/api/books/${id}/bookmark`)
      // .then(() => fetchData())
      .catch((error) => console.log('에러', error));
  };

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

  return (
    <>
      {content ? (
        <InfiniteScroll
          dataLength={content.data.content}
          // dataLength={data.content.length}
          // next={data.content && fetchMoreData}
          next={content.data.content && fetchMoreData}
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
              <b>Yayy! 모든 픽을 다 읽었어요!</b>
            </p>
          }
        >
          {content?.data.content?.map((data) => (
            <ItemContainer key={data.bookmarkId}>
              <Grid
                container
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Grid item xs={1.8}>
                  <BookImg
                    onClick={() => navigate(`/book/${data.collections.isbn13}`)}
                  >
                    {data.collections.bookCover ? (
                      <img
                        className="resize-book"
                        src={data.collections.bookCover}
                        alt="book thumbnail"
                      ></img>
                    ) : (
                      <img
                        className="resize"
                        src="/images/book.png"
                        alt="book thumbnail"
                      ></img>
                    )}
                  </BookImg>
                </Grid>

                <Grid
                  item
                  xs={10}
                  sx={{ height: '164px', marginBottom: '5px' }}
                >
                  <FlexBox
                    onClick={() => navigate(`/book/${data.collections.isbn13}`)}
                  >
                    <Grid sx={{ height: '32.8px' }}>
                      <Typography
                        className="title"
                        sx={{
                          display: 'flex',
                          mt: 1,
                          mb: 1,
                          fontSize: 17,
                          fontWeight: 400,
                        }}
                        color="#2e3031"
                        variant="body2"
                        component={'span'}
                      >
                        {data.collections.title}
                      </Typography>
                    </Grid>
                    <Grid sx={{ height: '98.4px' }}>
                      <Typography
                        color="#232627"
                        sx={{
                          fontWeight: 200,
                          height: 'auto',
                        }}
                        variant="body2"
                        component={'span'}
                      >
                        {data.collections.author}
                      </Typography>
                    </Grid>

                    <Grid sx={{ height: '32.8px' }}>
                      <div className="heart-star-title">
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          color="#BFBFBF"
                        >
                          <>
                            <StarRoundedIcon
                              style={{ color: '#6741ff' }}
                              sx={{
                                fontSize: 22,
                                marginBottom: 0,
                                marginRight: 0.3,
                                margin: 0,
                                padding: 0,
                              }}
                              variant="body2"
                            />

                            {data.collections.ratingCount
                              ? data.collections.ratingCount
                              : null}
                          </>
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          color="#BFBFBF"
                        ></Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                          }}
                          align="right"
                          color="#b3b3b3"
                        >
                          <div>{data.collections.author}</div>
                        </Grid>
                      </div>
                    </Grid>
                  </FlexBox>
                </Grid>
                <Grid
                  item
                  xs={0.2}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Remove>
                    <RemoveButton
                      onClick={() => {
                        if (window.confirm(`북마크를 삭제하시겠습니까?`)) {
                          onRemove(data.collections.isbn13);
                        }
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          '/images/bookmark_filled_icon.svg'
                        }
                        alt="bookmark icon"
                      />
                    </RemoveButton>
                  </Remove>
                </Grid>
              </Grid>
            </ItemContainer>
          ))}
        </InfiniteScroll>
      ) : (
        <div>데이터없어용</div>
      )}
    </>
  );
};
export default MyPickBook;
