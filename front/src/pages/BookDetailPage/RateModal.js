import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { FillButton, ContainedButton } from '../../components/Buttons';
import HoverRating from './RateStar';
import { useEffect, useState } from 'react';

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

export default function RateModal({
  isbn,
  bookData,
  getBookData,
  handleRating,
  handleCommentAdd,
}) {
  const [open, setOpen] = useState(false);
  const myRating = bookData?.myRating;
  const myComment = bookData?.myComment?.body || '';

  const [star, setStar] = useState(myRating);
  const [comment, setComment] = useState(myComment);

  useEffect(() => {
    getBookData(isbn);
    setStar(myRating);
    setComment(myComment);
  }, [myRating, myComment]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment?.length > 4) {
      const commentBody = { body: comment };
      handleCommentAdd(commentBody);
    }
    if (star > 0) {
      const ratingBody = { rating: star };
      handleRating(ratingBody);
    }
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
            <div>
              <LimitDesc>5글자 이상 입력하세요.</LimitDesc>
              <ContainedButton width="100%" onClick={handleSubmit}>
                별점만 등록
              </ContainedButton>
            </div>
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
