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

const MyPickPairing = ({ content, fetchCollectionData }) => {
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
      .post(`/books/pairings/${id}/bookmark`)
      .then(() => fetchPairingData())
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
      {content.data.content ? (
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
                <Grid
                  item
                  xs={1.8}
                  onClick={() => navigate(`/pairing/${data.pairingId}`)}
                  aria-hidden="true"
                >
                  <BookImg>
                    {data.collections.bookCover ? (
                      <img
                        className="resize-book"
                        src={data.collections.bookCover}
                        alt="book thumbnail"
                      ></img>
                    ) : (
                      <img
                        className="resize"
                        src="/images/pairing.png"
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
                    onClick={() =>
                      navigate(`/book/${data.collections.pairingId}`)
                    }
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
                        {data.collections.bookName}
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
                        {data.collections.content}
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
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                '/images/p_heart_filled_icon.svg'
                              }
                              alt="heart icon"
                            />
                          </>

                          {data.collections.collectionLike
                            ? data.collections.collectionLike
                            : 0}
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
                        ></Grid>
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
                        if (
                          window.confirm(
                            `${data.collections.pairingId}번째 페어링 북마크를 삭제하시겠습니까?`
                          )
                        ) {
                          onRemove(data.collections.pairingId);
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
export default MyPickPairing;
