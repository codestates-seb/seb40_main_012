/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  opacity: 0;
  cursor: pointer;
  &:hover {
    color: #6741ff;
  }
`;
const ItemContainer = styled.div`
  &:hover {
    ${Remove} {
      opacity: 1;
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

const MyCommentDetail = ({ data, fetchData }) => {
  const navigate = useNavigate();

  const onRemove = (id) => {
    axios
      .delete(`/api/comments/${id}/delete`)
      .then(() => fetchData())
      .catch((error) => console.log('에러', error));
  };

  return (
    <>
      {data ? (
        <>
          <ItemContainer key={data.commentId}>
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
                {/* 페어링인 경우 */}
                {data.commentType === 'PAIRING' ? (
                  <BookImg
                    onClick={() => {
                      navigate(`/pairing/${data.contentId}`);
                    }}
                  >
                    <img
                      className="resize"
                      src={data.cover ? data.cover : '/images/pairing.png'}
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                ) : null}

                {data.commentType === 'BOOK_COLLECTION' ? (
                  <BookImg
                    onClick={() => {
                      navigate(`/collection/${data.contentId}`);
                    }}
                  >
                    <img
                      className="resize"
                      src={
                        data.cover ? data.cover[0] : '/images/collection.png'
                      }
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                ) : null}

                {data.commentType === 'BOOK' ? (
                  <BookImg
                    onClick={() => {
                      navigate(`/book/${data.contentId}`);
                    }}
                  >
                    <img
                      className="resize"
                      src={data.cover ? data.cover : '/images/book.png'}
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                ) : null}
              </Grid>

              <Grid item xs={10} sx={{ height: '164px', marginBottom: '5px' }}>
                <FlexBox onClick={() => navigate(`/pairing/${data.contentId}`)}>
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
                      gutterBottom
                      component={'span'}
                    >
                      {data.title}
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
                      gutterBottom
                      component={'span'}
                    >
                      {data.body}
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
                        {data.commentType === 'BOOK' ? (
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
                              gutterBottom
                            />

                            {data.myBookRating !== null
                              ? data.myBookRating
                              : null}
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                '/images/p_heart_filled_icon.svg'
                              }
                              alt="heart icon"
                            />
                            {data.likeCount}
                          </>
                        )}
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
                        {data.commentType === 'BOOK' ? (
                          <>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                '/images/p_heart_filled_icon.svg'
                              }
                              alt="heart icon"
                            />
                            {data.likeCount}
                          </>
                        ) : null}
                      </Grid>
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
                        <div>
                          {data.commentType === 'BOOK' ? data.title : null}
                          {data.commentType === 'BOOK' ? data.author : null}
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
                <Remove
                  onClick={() => {
                    if (window.confirm(`코멘트를 삭제하시겠습니까?`)) {
                      onRemove(data.commentId);
                    }
                  }}
                >
                  <DeleteOutlinedIcon />
                </Remove>
              </Grid>
            </Grid>
          </ItemContainer>
        </>
      ) : (
        <div>데이터없어용</div>
      )}
    </>
  );
};
export default MyCommentDetail;