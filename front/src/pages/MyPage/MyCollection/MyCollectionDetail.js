/*eslint-disable*/

import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

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
      color: #795af5;
      transition: color 0.5s;
    }
  }
`;

const MyCollectionDetail = ({ data, fetchData }) => {
  const navigate = useNavigate();

  // console.log('data는어디에 ', data);

  const onRemove = (id) => {
    axios
      .delete(`/api/collections/${id}`)
      .then(() => fetchData())
      .catch((error) => console.log('에러', error));
  };

  return (
    <>
      {data ? (
        <ItemContainer key={data.collectionId}>
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
                onClick={() => {
                  navigate(`/collection/${data.collectionId}`);
                }}
              >
                {data.bookCover ? (
                  <img
                    className="resize-book"
                    src={data.bookCover}
                    alt="book thumbnail"
                  ></img>
                ) : (
                  <img
                    className="resize"
                    src="/images/collection.png"
                    alt="book thumbnail"
                  ></img>
                )}
              </BookImg>
            </Grid>

            <Grid item xs={10} sx={{ height: '164px', marginBottom: '5px' }}>
              <FlexBox
                onClick={() => navigate(`/collection/${data.collectionId}`)}
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
                    {data.content}
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
                        {data.collectionLike}
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
                      {/* <div>{data.author}</div> */}
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
                  if (window.confirm(`컬렉션을 삭제하시겠습니까?`)) {
                    onRemove(data.collectionId);
                  }
                }}
              >
                <DeleteOutlinedIcon />
              </Remove>
            </Grid>
          </Grid>
        </ItemContainer>
      ) : (
        <div>데이터없어용</div>
      )}
    </>
  );
};
export default MyCollectionDetail;
