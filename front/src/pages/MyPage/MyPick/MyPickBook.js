import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import axios from '../../../api/axios';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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
    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
`;

const MyPickBook = ({ content, fetchData }) => {
  const navigate = useNavigate();

  // useEffect(
  //   (id) => {
  //     navigate(`/book/${id}`);
  //   },
  //   [handleBookClick(id)]
  // );

  // const handleBookClick = (id) => {
  //   navigate(`/book/${id}`);
  // };

  console.log('받아온 content', content);
  const onRemove = (id) => {
    axios
      .post(`/api/books/${id}/bookmark`)
      .then(() => fetchData())
      .catch((error) => console.log('에러', error));
  };
  return (
    <div>
      {content.data ? (
        content.data.map((data, key) => (
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

              <Grid
                item
                xs={2}
                onClick={() => navigate(`/book/${data.isbn13}`)}
                aria-hidden="true"
              >
                {data && (
                  <BookImg>
                    <img
                      className="resize"
                      src={
                        data.bookCover
                          ? data.bookCover
                          : '/images/cherrypick_loading.gif'
                      }
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                )}
              </Grid>
              <Grid item xs={9}>
                <FlexBox
                  onClick={() => navigate(`/book/${data.isbn13}`)}
                  aria-hidden="true"
                >
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
                      {data.ratingCount}
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
                      color="#737373"
                    >
                      <div>
                        {data.bookName ? data.bookName : null}
                        {data.author ? data.author : null}
                      </div>
                    </Grid>
                  </div>
                </FlexBox>
              </Grid>

              <Grid
                item
                xs={0.5}
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
                          `${data.isbn13}번째 컬렉션을 삭제하시겠습니까?`
                        )
                      ) {
                        onRemove(data.isbn13);
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
        ))
      ) : (
        <div>데이터없어용</div>
      )}
    </div>
  );
};
export default MyPickBook;
