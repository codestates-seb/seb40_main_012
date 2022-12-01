import * as React from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
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

const Btns = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    background-color: #ffc5c5;
    color: #850000;
  }
`;

export default function DeleteModal({ deleteId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePairingDelete = () => {
    dispatch(asyncDeletePairing({ deleteId }));
    navigate(-1, { replace: true });
  };

  return (
    <div>
      <Btns onClick={handleOpen}>삭제하기</Btns>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={style}>
          <div className="info">정말 삭제하시겠습니까?</div>
          <div className="container">
            <div className="close" onClick={handleClose} role="presentation">
              취소
            </div>
            <div
              className="delete"
              onClick={handlePairingDelete}
              role="presentation"
            >
              삭제하기
            </div>
          </div>
        </ModalBox>
      </Modal>
    </div>
  );
}
