import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Comment from 'components/Comments/Comment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CommentsStyledBox = styled.div`
  width: 100%;
  height: 400px;
  overflow: scroll;
`;

const Btns = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  margin: 10px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

export default function BookCommentsModal({ data, isLogin, userEmail }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Btns onClick={handleOpen}>
        <span>코멘트 더보기</span>
      </Btns>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            코멘트
          </Typography>
          <CommentsStyledBox>
            {data?.map((el) => {
              return (
                <Comment
                  key={el?.commentId}
                  data={el}
                  isLogin={isLogin}
                  userEmail={userEmail}
                  commentId={el.commentId}
                  type="bookcomment"
                />
              );
            })}
          </CommentsStyledBox>
        </Box>
      </Modal>
    </div>
  );
}
