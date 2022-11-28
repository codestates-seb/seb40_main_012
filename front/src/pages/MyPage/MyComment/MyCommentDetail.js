/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import axios from '../../../api/axios';

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  opacity: 0;
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
    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
`;

const MyCommentBook = ({ data }) => {
  console.log('디테일에서 받아온 data', data);
  const onRemove = (id) => {
    axios
      .delete(`/api/comments/${id}/delete`)
      .then(location.reload())
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
              <Grid item xs={0.5} sx={{ width: 20 }}></Grid>

              <Grid item xs={2}>
                {data && (
                  <BookImg>
                    <img
                      className="resize"
                      src={
                        data.cover
                          ? data.cover
                          : '/images/cherrypick_loading.gif'
                      }
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                )}
              </Grid>
              <Grid item xs={9}>
                <FlexBox>
                  <Typography
                    sx={{
                      display: 'flex',
                      mt: 1,
                      mb: 1,
                      fontSize: 17,
                      fontWeight: 400,
                    }}
                    variant="body2"
                    gutterBottom
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    color="#232627"
                    sx={{
                      height: 125,
                      fontWeight: 200,
                    }}
                    variant="body2"
                    gutterBottom
                  >
                    {data.body}
                  </Typography>

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
                          <Typography
                            color="#6741ff"
                            sx={{
                              fontSize: 22,
                              marginBottom: 0,
                              marginRight: 0.3,
                            }}
                            variant="body2"
                            gutterBottom
                          >
                            ★
                          </Typography>

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
                      color="#737373"
                    >
                      <div>
                        {data.commentType === 'BOOK' ? data.title : null},
                        {data.commentType === 'BOOK' ? data.author : null}
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
export default MyCommentBook;
