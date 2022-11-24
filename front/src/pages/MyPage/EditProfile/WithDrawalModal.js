import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton } from '../../../components/Buttons';

const ContainerStyled = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
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

const PasswordCheckInputStyled = styled.input`
  // design fluff
  width: 100%;
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

const ModalBoxStyled = styled.div`
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
    flex-direction: row-reverse !important;
    cursor: pointer;
  }
  .password-check {
    font-size: 0.8rem;
  }
`;

const ContainedButtonStyled = styled(ContainedButton)`
  margin-top: 20px;
`;

const WithDrawalModal = ({ open, handleCloseModal }) => {
  return (
    <ContainerStyled>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBoxStyled>
          <div className="close-icon">
            <CloseIcon
              width="100%"
              style={{ textAlign: 'right' }}
              sx={{
                align: 'right',
                flexDirection: 'row-reverse',
              }}
              align="right"
              onClick={handleCloseModal}
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
          <PasswordCheckInputStyled></PasswordCheckInputStyled>
          <ContainedButtonStyled size="medium">탈퇴하기</ContainedButtonStyled>
        </ModalBoxStyled>
      </Modal>
    </ContainerStyled>
  );
};

export default WithDrawalModal;
