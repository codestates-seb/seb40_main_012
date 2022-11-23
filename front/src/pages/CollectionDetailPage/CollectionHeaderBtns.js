import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';

const CollectionHeaderBtnsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CollectionBtns = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 3px;
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
const CollectionBookmark = styled(CollectionBtns)``;
const CollectionHeart = styled(CollectionBtns)``;
const CollectionShare = styled(CollectionBtns)``;
const CollectionDelete = styled(CollectionBtns)`
  &:hover {
    background-color: #ffc5c5;
    color: #850000;
  }
`;

const ModalBox = styled.div`
  width: 300px;
  height: 150px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .info {
    font-weight: 700;
  }
  .container {
    display: flex;
    margin-top: 20px;
  }
  .delete {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 700;
    background-color: #ffc5c5;
    color: #850000;
    &:hover {
      cursor: pointer;
    }
  }
  .close {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 700;
    background-color: #e8e8e8;
    &:hover {
      cursor: pointer;
    }
  }
`;

//TODO: 내가 작성한 컬렉션만 삭제 버튼 노출
const CollectionHeaderBtns = ({
  likeCount,
  userLike,
  handleCollectionLike,
  handleCollectionDelete,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsLiked(userLike);
  }, [userLike]);

  const handleClickLikeBtn = () => {
    handleCollectionLike();
  };

  return (
    <CollectionHeaderBtnsContainer>
      <CollectionBookmark>
        <img
          src={process.env.PUBLIC_URL + '/images/bookmark_filled_icon.svg'}
          alt="bookmark icon"
        />
        북마크
      </CollectionBookmark>
      <CollectionHeart onClick={handleClickLikeBtn}>
        {isLiked ? (
          <img
            src={process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'}
            alt="heart icon"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + '/images/p_heart_unfilled_icon.svg'}
            alt="heart icon"
          />
        )}
        {likeCount}
      </CollectionHeart>
      <CollectionShare>
        <img
          src={process.env.PUBLIC_URL + '/images/share_icon.svg'}
          alt="share icon"
        />
        공유하기
      </CollectionShare>
      <CollectionDelete onClick={handleOpen}>삭제하기</CollectionDelete>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <div className="info">정말 삭제하시겠습니까?</div>
          <div className="container">
            <div className="close" onClick={handleClose} role="presentation">
              취소
            </div>
            <div
              className="delete"
              onClick={handleCollectionDelete}
              role="presentation"
            >
              삭제하기
            </div>
          </div>
        </ModalBox>
      </Modal>
    </CollectionHeaderBtnsContainer>
  );
};

export default CollectionHeaderBtns;
