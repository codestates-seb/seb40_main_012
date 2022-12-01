/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import InfiniteScroll from 'react-infinite-scroll-component';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MyCommentDetail from './MyCommentDetail';
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { COMMENT_URL } from '../../../api/requests';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../../../components/Buttons';
import Modal from '@mui/material/Modal';

const ContentContainer = styled.div`
  margin-bottom: 10rem;

  .loading {
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

const ModalBox = styled.div`
  width: 300px;
  height: 150px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .info {
    font-weight: 700;
  }
  .container {
    display: flex;
    margin-top: 20px;
  }
  .delete {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 700;
    background-color: #ffc5c5;
    color: #850000;
    &:hover {
      cursor: pointer;
    }
  }
  .close {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 700;
    background-color: #e8e8e8;
    &:hover {
      cursor: pointer;
    }
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

const Content = () => {
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [content, setContent] = useState({
    data: [],
  });
  const [page, setPage] = useState(2);
  //Delete Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    axios
      .get(`api/mypage/userComment?page=1`)
      .then((response) => {
        console.log('response배열', response.data.data.content);
        setContent({
          data: response.data.data.content,
        });
        console.log('response.data.isLast', response.data.isLast);
        setHasMore(response.data.isLast === false ? true : false);
      })
      .catch((error) => console.log('에러', error));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      if (hasMore === true && page) {
        axios
          .get(`api/mypage/userComment?page=${page}`)
          .then((response) => {
            setContent({
              data: content.data.concat(response.data.data.content),
            });
            setHasMore(response.data.isLast === false ? true : false);
            {
              response.data.isLast !== true ? setPage(page + 1) : null;
            }
          })
          .catch((error) => console.log('에러', error));
      }
    }, 500);
  };

  const removeAll = () => {
    axios
      .delete(`api/comments/delete`)
      .then(() => fetchData())
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    fetchData();
    setHasMore(content.data.isLast === false ? true : false);
  }, []);
  console.log(hasMore);
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
            <ButtonCSS onClick={handleOpen}>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBox>
                <div className="info">
                  모든 코멘트가 삭제됩니다.
                  <br />
                  정말 삭제하시겠습니까?
                </div>
                <div className="container">
                  <div
                    className="close"
                    role="presentation"
                    onClick={handleClose}
                  >
                    취소
                  </div>
                  <div
                    className="delete"
                    onClick={() => {
                      removeAll();
                      handleClose();
                    }}
                    role="presentation"
                  >
                    삭제하기
                  </div>
                </div>
              </ModalBox>
            </Modal>
          </Grid>
        </Grid>

        {content.data.length ? (
          <InfiniteScroll
            dataLength={content.data.length}
            // dataLength={data.content.length}
            // next={data.content && fetchMoreData}
            next={fetchMoreData}
            hasMore={hasMore} // 스크롤 막을지 말지 결정
            loader={
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <img
                  className="loading"
                  src={'/images/spinner.gif'}
                  alt="loading cherrypick"
                ></img>
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
                  모든 코멘트를 다 읽었어요!
                </Typography>
              </p>
            }
          >
            <div>
              {content.data ? (
                content.data?.map((data) => (
                  <MyCommentDetail
                    key={data.commentId}
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
              <br />
              메인 페이지에서 체리픽의 인기 컨텐츠를 추천해드릴게요!
              <br />
              <br />
              <BasicButton onClick={() => navigate(`/`)}>
                메인 페이지
              </BasicButton>
            </Typography>
          </div>
        )}
      </ContentContainer>
    </>
  );
};
export default Content;
