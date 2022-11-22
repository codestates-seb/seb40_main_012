import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  /* align-items: center; */
  margin-top: 2rem;
  margin-bottom: 4rem;
  .with-drawal-text {
    cursor: pointer;
    width: 100%;
    font-size: 15px;
    font-weight: 300;
    margin-top: 10px;
    color: #737373;
  }
`;

const PasswordCheck = styled.input`
  // design fluff
  display: block;
  -webkit-appearance: none;
  border: 1px solid white;
  border-radius: 50px;
  padding: 10px;
  background-color: #e5e5e5;
  color: #a0a0a0;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
`;

const ModalBox = styled.div`
  width: 400px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 25px;

  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  .info {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.colors.darkgray};
    font-weight: 500;
    text-align: center;
  }

  .close-icon {
    width: 100%;
    display: flex;
    /* display: flex !important; */
    flex-direction: row-reverse !important;
    cursor: pointer;
  }
  .password-check {
    font-size: 0.8rem;
  }
`;

//TODO: 페어링, 컬렉션 안내 메시지 추가
const Guide = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div
          className="with-drawal-text"
          onClick={handleOpen}
          role="presentation"
        >
          <div>회원 탈퇴</div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox>
            <div className="close-icon">
              <CloseIcon
                width="100%"
                style={{ textAlign: 'right' }}
                sx={{
                  align: 'right',
                  alignItems: 'right',
                  flexDirection: 'row-reverse',
                }}
                align="right"
                alignItems="right"
                onClick={handleClose}
                color="disabled"
              ></CloseIcon>
            </div>
            <div className="title">회원 탈퇴</div>

            <div className="info">
              정말로 회원을 탈퇴 하시겠어요? <br />
              즉시 로그아웃 되며
              <br />
              다시 로그인 하실 수 없어요.
              <br />
            </div>
            <div className="password-check">비밀번호</div>
            <PasswordCheck></PasswordCheck>
          </ModalBox>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Guide;
