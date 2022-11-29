import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';

const GuideContainer = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
  padding: 0 10px;
  display: flex;
  align-items: center;
  div {
    margin-right: 5px;
  }
  .questionmark {
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ModalBox = styled.div`
  width: 400px;
  height: 230px;
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
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  .info {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.darkgray};
    font-weight: 500;
    text-align: center;
  }
`;

const Guide = ({ type }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <GuideContainer>
      {type === 'pairing' ? (
        <>
          <div
            className="questionmark"
            onClick={handleOpen}
            role="presentation"
          >
            <img
              src={process.env.PUBLIC_URL + '/images/question_info_icon.svg'}
              alt="question"
            />
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
                  src={
                    process.env.PUBLIC_URL + '/images/question_info_icon.svg'
                  }
                  alt="question info"
                />
              </div>
              <div className="title">페어링</div>
              <div className="info">
                책과 어울리는 여러가지 문화 컨텐츠를 추천합니다. <br />( 영화 /
                음식 / 장소 / 음악 / 책 ) <br />
                책을 중심으로 나만의 새로운 조합을 발견해보세요.
              </div>
            </ModalBox>
          </Modal>
        </>
      ) : (
        <>
          <div
            className="questionmark"
            onClick={handleOpen}
            role="presentation"
          >
            <img
              src={process.env.PUBLIC_URL + '/images/question_info_icon.svg'}
              alt="question"
            />
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
                  src={
                    process.env.PUBLIC_URL + '/images/question_info_icon.svg'
                  }
                  alt="question info"
                />
              </div>
              <div className="title">컬렉션</div>
              <div className="info">
                원하는 책을 골라 나만의 책장을 만들 수 있습니다.
                <br />
                좋아하거나 재미있게 읽은 책이 있다면 컬렉션을 만들고
                공유해보세요.
              </div>
            </ModalBox>
          </Modal>
        </>
      )}
    </GuideContainer>
  );
};

export default Guide;
