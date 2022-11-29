import { useState } from 'react';
import styled from 'styled-components';
import LinkCopyModal from '../../../components/LinkCopyModal';
import { useLocation } from 'react-router-dom';

const Btns = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

const CopyUrlButton = () => {
  //LinkCopy Modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const location = useLocation();

  const copyUrl = () => {
    handleModalOpen();
  };

  return (
    <div>
      <Btns onClick={copyUrl}>
        <img
          src={process.env.PUBLIC_URL + '/images/share_icon.svg'}
          alt="share icon"
        />
        <span>공유하기</span>
      </Btns>
      <LinkCopyModal
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        type="특별한 페어링을"
        link={location.pathname}
      />
    </div>
  );
};

export default CopyUrlButton;
