import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

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
  padding: 15px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  div {
    flex: 1;
    text-align: center;
    margin-left: 24px;
    font-weight: 600;
  }
  button {
    width: 24px;
    background-color: transparent;
    border: none;
    font-weight: 700;
    &:hover {
      cursor: pointer;
    }
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  text-align: center;
  padding-bottom: 15px;
  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  padding: 20px 0 10px;
  .share {
    font-size: 14px;
    font-weight: 600;
  }
`;

const LinkBox = styled.div`
  display: flex;
  margin: 5px 0;
  input {
    flex: 1;
    overflow-x: auto;
    white-space: nowrap;
    background-color: #f5f5f5;
    border: none;
    padding: 7px;
    border-radius: 3px;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 60px;
    height: 30px;
    font-weight: 700;
    border: none;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.mainColor};
    background-color: ${({ theme }) => theme.colors.purple_3};
    &:hover {
      background-color: ${({ theme }) => theme.colors.purple_2};
      cursor: pointer;
    }
  }
`;

const ConfirmBox = styled.div`
  width: 100%;
  text-align: end;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainColor};
  &.hide {
    display: none;
  }
`;

const LinkCopyModal = ({
  modalOpen,
  handleClose,
  type = '컨텐츠를',
  link = '---',
}) => {
  const [copied, setCopied] = useState(false);
  const CopyLink = `https://cherry-pick.co.kr${link}`;

  const handleClickCopy = () => {
    navigator.clipboard.writeText(CopyLink);
    setCopied(true);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <TitleContainer>
          <div>공유하기</div>
          <button onClick={handleClose}>
            <img
              src={process.env.PUBLIC_URL + '/images/close_icon.svg'}
              alt="close"
            />
          </button>
        </TitleContainer>
        <InfoContainer>
          <span>{type}</span> 다른 사람과 공유해보세요!
        </InfoContainer>
        <LinkContainer>
          <div className="share">링크 공유</div>
          <LinkBox>
            <input readOnly value={`https://cherry-pick.co.kr${link}`}></input>
            <button onClick={handleClickCopy}>복사</button>
          </LinkBox>
        </LinkContainer>
        <ConfirmBox className={copied ? 'show' : 'hide'}>
          복사되었습니다!
        </ConfirmBox>
      </ModalBox>
    </Modal>
  );
};

export default LinkCopyModal;
