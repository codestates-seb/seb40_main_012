import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { BasicButton } from '../../../components/Buttons';
import { MY_PICK_BOOK } from '../../../api/requests';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';
import { useDispatch } from 'react-redux';

const Remove = styled.div`
  color: #dee2e6;
  opacity: 0;
  @media screen and (max-width: 870px) {
    display: none !important;
  }
`;

const RemoveButton = styled.button`
  all: unset;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const NoDataNotice = styled.div`
  text-align: center;
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
  .move {
    @media screen and (max-width: 750px) {
      width: 100%;
      flex-direction: column;
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
  }
  .move-image {
    width: 112px !important;
    height: 158px !important;
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
      color: #795af5;
      transition: color 0.5s;
    }
    line-height: 1.5 !important;
    max-height: 3 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  .content-body {
    line-height: 1.5 !important;
    max-height: 3 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
`;

const MyPickBook = () => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState({
    data: [],
  });
  const [lastId, setLastId] = useState();
  const dispatch = useDispatch();

  const onRemove = (id) => {
    try {
      axios.post(`/api/books/${id}/bookmark`).then(() => fetchBookData());
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

  const fetchBookData = async () => {
    try {
      axios.get(MY_PICK_BOOK).then((response) => {
        setContent({
          data: response.data.data.content,
        });
        {
          response.data.data.content.length
            ? setLastId(
                response.data.data.content[
                  response.data.data.content.length - 1
                ].bookmarkId
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

  const fetchMoreData = () => {
    try {
      setTimeout(() => {
        if (hasMore === true && lastId) {
          axios
            .get(`/api/mypage/bookmark/book?lastId=${lastId}`)
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
                      ].bookmarkId
                    )
                  : null;
              }
            });
        }
      }, 500);
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
    fetchBookData();
    setHasMore(content.data.length < 5 ? false : true);
  }, []);

  return (
    <>
      {content.data.length ? (
        <InfiniteScroll
          dataLength={content.data.length}
          next={fetchMoreData}
          hasMore={hasMore}
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
                모든 픽을 다 읽었어요!
              </Typography>
            </p>
          }
        >
          {content.data?.map((data) => (
            <ItemContainer key={data.bookmarkId}>
              <Grid
                container
                item
                className="move"
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Grid item xs={1.8} className="move-image">
                  <BookImg
                    className="move-image"
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
                  xs={9.9}
                  sx={{ height: '164px', marginBottom: '5px' }}
                >
                  <FlexBox
                    onClick={() => navigate(`/book/${data.collections.isbn13}`)}
                  >
                    <Grid
                      sx={{
                        height: '12.8px',
                        marginBottom: '5px',
                        marginTop: '3px',
                      }}
                    >
                      <Typography
                        color="#6741ff"
                        sx={{
                          fontWeight: 400,
                          fontSize: 12,
                          mb: 0,
                          mt: 0,
                        }}
                        variant="body2"
                        component={'span'}
                      >
                        책
                      </Typography>
                    </Grid>
                    <Grid sx={{ height: '29.8px' }}>
                      <Typography
                        className="title"
                        sx={{
                          display: 'flex',

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
                    <Grid sx={{ height: '89.2px', marginTop: '2px' }}>
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

                    <Grid sx={{ height: '21.2px', marginBottom: '1px' }}>
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
                              : 0}
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
                        onRemove(data.collections.isbn13);
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
        <NoDataNotice>
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
            <br />
            메인 페이지에서 체리픽의 인기 도서를 추천해드릴게요!
            <br />
            <br />
            <BasicButton onClick={() => navigate(`/`)}>메인 페이지</BasicButton>
          </Typography>
        </NoDataNotice>
      )}
    </>
  );
};
export default MyPickBook;
