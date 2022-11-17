import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Modal from '@mui/material/Modal';

const GuideContainer = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
  padding: 0 30px;
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
  width: 100px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
`;

//TODO: 페어링, 컬렉션 안내 메시지 추가
const Guide = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <GuideContainer>
        <div>페어링, 컬렉션</div>
        <div className="questionmark" onClick={handleOpen} role="presentation">
          <img
            src={process.env.PUBLIC_URL + '/images/question_icon.svg'}
            alt="question"
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox>modal</ModalBox>
        </Modal>
      </GuideContainer>
    </ThemeProvider>
  );
};

export default Guide;
