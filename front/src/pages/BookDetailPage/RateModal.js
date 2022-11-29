import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { FillButton, ContainedButton } from '../../components/Buttons';
import HoverRating from './RateStar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  postBookComment,
  patchBookStarRating,
} from '../../store/modules/bookSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 0px 5px 70px;
`;

const LimitDesc = styled.p`
  color: gray;
  font-size: 13px;
  margin-left: 15px;
`;

export default function RateModal({ isbn }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // console.log('별점', star);
  // console.log('코멘트', comment);

  const handleSubmit = () => {
    if (comment.length > 4) {
      const commentBody = { body: comment };
      dispatch(postBookComment({ isbn, commentBody }));
    }
    if (star > 0) {
      const ratingBody = { rating: star };
      dispatch(patchBookStarRating({ isbn, ratingBody }));
    }
    setStar(0);
    setComment('');
    handleClose();
  };

  return (
    <>
      <FillButton onClick={handleOpen}>평가하기</FillButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            이 책에 대한 별점과 코멘트를 달아보세요
          </Typography>
          <DivStyled>
            <HoverRating star={star} setStar={setStar} />
          </DivStyled>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '98%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              placeholder="코멘트를 입력해주세요"
              value={comment}
              onChange={handleComment}
              multiline
              rows={3}
            />
          </Box>
          {comment.length < 5 ? (
            <LimitDesc>5글자 이상 입력하세요.</LimitDesc>
          ) : (
            <ContainedButton width="100%" onClick={handleSubmit}>
              등록
            </ContainedButton>
          )}
        </Box>
      </Modal>
    </>
  );
}
