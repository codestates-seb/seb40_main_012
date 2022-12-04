import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton } from 'components';
import { myPageApi, authApi } from 'api';
import { useNavigate } from 'react-router-dom';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';
import { useDispatch } from 'react-redux';

const PasswordCheckInputStyled = styled.input`
  width: 100%;
  display: block;
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

const ModalBoxStyled = styled.form`
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
  margin: 10px 0 15px;
`;

const PasswordErrorMessageStyled = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const WithDrawalModal = ({ open, handleCloseModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const hadleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myPageApi.currentPasswordCheck(passwordValue);
      if (!response) {
        setPasswordErrMsg('현재 비밀번호를 다시 확인해주세요.');
        return;
      }
      setPasswordErrMsg('');
      await Promise.all[(myPageApi.withdrawal(), authApi.logout())]; // 회원탈퇴 api 단에서 로그아웃 api 로직까지 같이 처리해주는게 좋을 것 같음
      navigate('/', { replace: true });
      dispatch(
        setOpenSnackbar({
          severity: 'info',
          message: '그동안 체리픽 서비스를 이용해 주셔서 감사합니다.',
        })
      );
    } catch (error) {
      const { message } = error;
      dispatch(
        setOpenSnackbar({
          severity: 'error',
          message: message,
        })
      );
    }
  };

  const handleChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBoxStyled onSubmit={hadleClickSubmit}>
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
        <p className="info">
          탈퇴 후에는 회원정보 및 서비스 이용기록이
          <br />
          모두 삭제되어 복구할 수 없습니다.
          {/* <br />
          안내 사항을 모두 확인하였으며, 이에 동의합니다. */}
        </p>
        <div className="password-check">비밀번호</div>
        <PasswordCheckInputStyled
          type="password"
          value={passwordValue}
          onChange={handleChangePasswordValue}
        ></PasswordCheckInputStyled>
        <PasswordErrorMessageStyled>
          {passwordErrMsg}
        </PasswordErrorMessageStyled>
        <ContainedButtonStyled size="medium" onClick={hadleClickSubmit}>
          탈퇴하기
        </ContainedButtonStyled>
      </ModalBoxStyled>
    </Modal>
  );
};

export default WithDrawalModal;
