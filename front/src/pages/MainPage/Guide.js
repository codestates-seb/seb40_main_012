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
  &.best {
    display: none;
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
    <GuideContainer className={type}>
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
              <div className="title">?????????</div>
              <div className="info">
                ?????? ???????????? ???????????? ?????? ???????????? ???????????????. <br />( ?????? /
                ?????? / ?????? / ?????? / ??? ) <br />
                ?????? ???????????? ????????? ????????? ????????? ??????????????????.
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
              <div className="title">?????????</div>
              <div className="info">
                ????????? ?????? ?????? ????????? ????????? ?????? ??? ????????????.
                <br />
                ??????????????? ???????????? ?????? ?????? ????????? ???????????? ?????????
                ??????????????????.
              </div>
            </ModalBox>
          </Modal>
        </>
      )}
    </GuideContainer>
  );
};

export default Guide;
