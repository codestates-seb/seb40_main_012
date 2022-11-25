import styled from 'styled-components';
import { BasicButton } from '../../components/Buttons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/modules/authSlice';
import Modal from '@mui/material/Modal';

const CollectionHeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectionInfo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const CollectionWriteBtn = styled(BasicButton)`
  &:hover {
    cursor: pointer;
  }
`;

const ModalBox = styled.div`
  width: 300px;
  height: 130px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  .login {
    color: ${({ theme }) => theme.colors.mainColor};
    margin-top: 10px;
    padding: 5px;
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.purple_3};
    }
  }
  a {
    font-weight: 700;
    text-decoration: none;
  }
`;

const CollectionHeader = () => {
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();
  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWriteBtnClick = () => {
    if (isLogin) {
      navigate('/collection/write');
    } else {
      handleOpen();
    }
  };

  return (
    <CollectionHeaderContainer>
      <CollectionInfo>
        당신만을 위한 <span>Cherry Pick</span> 컬렉션
      </CollectionInfo>
      <CollectionWriteBtn
        onClick={handleWriteBtnClick}
        width="90px"
        height="30px"
        fontSize="12px"
      >
        컬렉션 만들기
      </CollectionWriteBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <div>로그인이 필요한 서비스입니다.</div>
          <Link to="/user/signin">
            <div className="login">로그인</div>
          </Link>
        </ModalBox>
      </Modal>
    </CollectionHeaderContainer>
  );
};

export default CollectionHeader;
