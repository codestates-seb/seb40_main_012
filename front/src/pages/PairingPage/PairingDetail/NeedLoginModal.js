import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { TextButton, ContainedButton } from '../../../components/Buttons';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

const BtnStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  margin-left: -15px;
`;

const Btns = styled.div`
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
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function NeedLoginModal({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Btns onClick={handleOpen}>{children}</Btns>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InfoContainer>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              로그인이 필요한 서비스입니다.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              로그인 또는 회원가입 하시겠습니까?
            </Typography>
          </InfoContainer>
          <BtnStyleBox>
            <TextButton width={'100px'} onClick={handleClose}>
              창 닫기
            </TextButton>
            <ContainedButton
              width={'100px'}
              onClick={() => {
                navigate('/user/signin');
              }}
            >
              로그인
            </ContainedButton>
            <ContainedButton
              width={'100px'}
              onClick={() => {
                navigate('/user/signup');
              }}
            >
              회원가입
            </ContainedButton>
          </BtnStyleBox>
        </Box>
      </Modal>
    </div>
  );
}
