import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const GuideContainer = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
  padding: 0 30px;
  display: flex;
  flex-direction: left;

  .guide-move {
    display: flex !important;

    @media screen and (max-width: 870px) {
      display: none !important;
    }
  }

  div {
    margin-right: 5px;
  }
  .questionmark {
    display: flex;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 22px;
      height: 22px;
    }
  }
`;

const ModalBox = styled.div`
  width: 400px;
  height: 250px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  img {
    width: 30px;
    height: 30px;
  }
  .img_container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
    margin-bottom: 15px;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  .info {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.darkgray};
    font-weight: 500;
    text-align: center;
    br {
      margin-bottom: 10px;
    }
  }
`;

//TODO: 페어링, 컬렉션 안내 메시지 추가
const MyPickGuide = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <GuideContainer>
      <div className="guide-move ">
        <Typography
          color="#737373"
          sx={{
            display: 'flex',
          }}
          variant="body2"
          gutterBottom
          style={{
            textAlign: 'center',
            alignItems: 'center',
            marginBottom: 0,
          }}
        >
          나의 픽이란?
        </Typography>
        <div className="questionmark" onClick={handleOpen} role="presentation">
          <img
            src={process.env.PUBLIC_URL + '/images/question_info_icon.svg'}
            alt="question"
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <div className="img_container">
            <img
              src={process.env.PUBLIC_URL + '/images/question_info_icon.svg'}
              alt="question info"
            />
          </div>
          <div className="title">나의 픽이란?</div>
          <div className="info">
            관심있는 페어링, 컬렉션, 책을 한 곳에 모아
            <br />
            열람할 수 있는 즐겨찾기 기능입니다.
            <br />
            <br />
            오래도록 간직하고 싶은
            <br />
            페어링, 컬렉션, 책을 담아보세요.
            <br />
          </div>
        </ModalBox>
      </Modal>
    </GuideContainer>
  );
};

export default MyPickGuide;
