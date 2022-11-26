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

const BookImg = styled.div`
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
  .comment {
    height: 125px;
    color: #232627;
  }
  .heart-star-title {
    display: flex;
    flex-direction: row;
  }
`;

const MyCommentBook = ({ content }) => {
  console.log('받아온 content', content);
  const onRemove = (id) => {
    axios
      .delete(`/api/comments/${id}/delete`)
      .then(location.reload())
      .catch((error) => console.log('에러', error));
  };
  return (
    <div>
      {content.bookComment ? (
        content.bookComment.map((data, key) => (
          <ItemContainer key={key}>
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
                    {data.bookName}
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
                    {data.content}
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
                      <StarRoundedIcon
                        align="center"
                        style={{ color: 'FFF599' }}
                      />
                      {data.rating}
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
                      <>
                        <FavoriteTwoToneIcon
                          sx={{ width: 19.5, height: 19.5 }}
                          align="center"
                          style={{ color: 'FFD8D8' }}
                        />
                        {data.commentLike}
                      </>
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
                        {data.bookName ? data.bookName : null},
                        {data.author ? data.author : null}
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
        ))
      ) : (
        <div>데이터없어용</div>
      )}
    </div>
  );
};
export default MyCommentBook;
