import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { TextButton, ContainedButton } from '../../../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncDeletePairing } from '../../../store/modules/pairingSlice';

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
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
    color: #850000;
    background-color: #e8e8e8;
  }
`;

const BtnStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  margin-left: -15px;
`;

export default function DeleteModal({ deleteId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePairingDelete = () => {
    dispatch(asyncDeletePairing({ deleteId }));
    navigate('/pairing', { replace: true });
  };

  return (
    <div>
      <Btns onClick={handleOpen}>
        <span>삭제하기</span>
      </Btns>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            이 페어링을 삭제하시겠습니까?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            삭제된 페어링 게시글은 다시 되돌릴 수 없습니다.
          </Typography>
          <BtnStyleBox>
            <TextButton width={'120px'} onClick={handleClose}>
              취소하기
            </TextButton>
            <ContainedButton width={'120px'} onClick={handlePairingDelete}>
              삭제하기
            </ContainedButton>
          </BtnStyleBox>
        </Box>
      </Modal>
    </div>
  );
}
