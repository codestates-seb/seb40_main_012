/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import NavigateBook from './NavigateBook';
import NavigatePairing from './NavigatePairing';
import NavigateCollection from './NavigateCollection';
import CollectionThumbnail from './CollectionThumbnail';

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
    filter: drop-shadow(3px 3px 3px rgb(93 93 93 / 80%));
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
                  <>
                    <BookImg
                      onClick={() => {
                        navigate(`/collection/${data.contentId}`);
                      }}
                    >
                      {data.collectionCover !== null ? (
                        <CollectionThumbnail
                          data={data}
                          // collectionCover={data.collectionCover}
                        />
                      ) : null}
                      {data.collectionCover == null ? (
                        <img
                          className="resize"
                          src={
                            data.collectionCover
                              ? data.collectionCover[0]
                              : '/images/collection.png'
                          }
                          alt="book thumbnail"
                        ></img>
                      ) : null}
                    </BookImg>
                  </>
                ) : null}

                {data.commentType === 'BOOK' ? (
                  <BookImg
                    onClick={() => {
                      navigate(`/book/${data.contentId}`);
                    }}
                  >
                    <img
                      className="resize-book"
                      src={data.cover ? data.cover : '/images/book.png'}
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
                ) : null}
              </Grid>

              <Grid item xs={10} sx={{ height: '164px', marginBottom: '5px' }}>
                {data.commentType === 'BOOK' ? (
                  <NavigateBook data={data} navigate={navigate} />
                ) : null}
                {data.commentType === 'PAIRING' ? (
                  <NavigatePairing data={data} navigate={navigate} />
                ) : null}
                {data.commentType === 'BOOK_COLLECTION' ? (
                  <NavigateCollection data={data} navigate={navigate} />
                ) : null}
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
    </>
  );
};
export default MyCommentDetail;
