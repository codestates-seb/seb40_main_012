import styled from 'styled-components';
import { Modal } from '@mui/material';
import { useState } from 'react';

const MainInformationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  img {
    width: 12%;
  }
  padding-right: 6%;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const ModalBox = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MainInformation = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainInformationContainer>
      <img
        src={process.env.PUBLIC_URL + '/images/QR_info.svg'}
        alt="QR code"
        onClick={handleOpen}
        role="presentation"
      />
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <img
            src={process.env.PUBLIC_URL + '/images/cherrypick_QR.png'}
            alt="QR code"
          />
        </ModalBox>
      </Modal>
    </MainInformationContainer>
  );
};

export default MainInformation;
