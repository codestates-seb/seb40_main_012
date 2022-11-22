import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FillButton } from '../../components/Buttons';
import HoverRating from './RateStar';
import CommentAdd from '../../components/Comments/CommentAdd';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function RateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
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
          <HoverRating />
          <CommentAdd />
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
