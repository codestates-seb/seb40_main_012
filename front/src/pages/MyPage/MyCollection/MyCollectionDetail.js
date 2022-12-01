/*eslint-disable*/

import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MyCollectionThumbnail from './MyCollectionThumbnail';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  opacity: 0;
  cursor: pointer;
  &:hover {
    color: #6741ff;
  }
  @media screen and (max-width: 870px) {
    display: none !important;
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
  padding-right: 20px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;
  width: 100%;

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

const MyCollectionDetail = ({ data, fetchData }) => {
  const navigate = useNavigate();
  //Delete Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            className="move"
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Grid item xs={1.8} className="move-image">
              <BookImg
                className="move-image"
                onClick={() => {
                  navigate(`/collection/${data.collectionId}`);
                }}
              >
                {data.books ? (
                  <MyCollectionThumbnail data={data} />
                ) : (
                  <img
                    src={'/images/collection.png'}
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
                  <div className="content-body">
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
                  </div>
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
              <Remove onClick={handleOpen}>
                <DeleteOutlinedIcon />
              </Remove>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalBox>
                  <div className="info">정말 삭제하시겠습니까?</div>
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
                        onRemove(data.collectionId);
                      }}
                      role="presentation"
                    >
                      삭제하기
                    </div>
                  </div>
                </ModalBox>
              </Modal>
              {/* <Remove
                onClick={() => {
                  if (window.confirm(`컬렉션을 삭제하시겠습니까?`)) {
                    onRemove(data.collectionId);
                  }
                }}
              > */}
            </Grid>
          </Grid>
        </ItemContainer>
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
export default MyCollectionDetail;
