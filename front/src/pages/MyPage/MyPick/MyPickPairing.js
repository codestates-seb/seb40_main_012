import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { MY_PICK_PAIRING } from '../../../api/requests';
import { BasicButton } from '../../../components/Buttons';
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
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  padding-right: 20px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;
  width: 100%;

  .title-author {
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
`;

const MyPickPairing = () => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [pairingContent, setPairingContent] = useState({
    data: [],
  });
  const [lastId, setLastId] = useState();
  const dispatch = useDispatch();

  const fetchPairingData = async () => {
    try {
      axios.get(MY_PICK_PAIRING).then((response) => {
        setPairingContent({
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

  const onRemove = (id) => {
    try {
      axios
        .post(`/api/books/pairings/${id}/bookmark`)
        .then(() => fetchPairingData());
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
            .get(`/api/mypage/bookmark/pairing?lastId=${lastId}`)
            .then((response) => {
              setPairingContent({
                data: pairingContent.data.concat(response.data.data.content),
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
    fetchPairingData();
    setHasMore(pairingContent.data.length < 5 ? false : true);
  }, []);
  return (
    <>
      {pairingContent.data.length ? (
        <InfiniteScroll
          dataLength={pairingContent.data.length}
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
          {pairingContent.data.map((data) => (
            <ItemContainer key={data.bookmarkId}>
              <Grid
                container
                className="move"
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Grid item xs={1.8} aria-hidden="true">
                  <BookImg
                    onClick={() =>
                      navigate(`/pairing/${data.collections.pairingId}`)
                    }
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
                      navigate(`/pairing/${data.collections.pairingId}`)
                    }
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
                        }}
                        variant="body2"
                        component={'span'}
                      >
                        페어링
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
                        {data.collections.bookName}
                      </Typography>
                    </Grid>
                    <Grid sx={{ height: '89.2px', marginTop: '2px' }}>
                      <div className="content-body">
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
                      </div>
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
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                '/images/p_heart_filled_icon.svg'
                              }
                              alt="heart icon"
                            />
                          </>

                          {data.collections.pairingLike
                            ? data.collections.pairingLike
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
                        >
                          <div className="title-author">
                            {data.collections.author}
                          </div>
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
                      onClick={() => onRemove(data.collections.pairingId)}
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
            페어링 페이지에서 체리픽의 인기 페어링을 추천해드릴게요!
            <br />
            <br />
            <BasicButton onClick={() => navigate(`/pairing`)}>
              페어링 페이지
            </BasicButton>
          </Typography>
        </NoDataNotice>
      )}
    </>
  );
};
export default MyPickPairing;
