import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { TextButton, ContainedButton } from '../../../components/Buttons';
import useInput from '../../../util/useInput';
import BasicSelect from '../PairingWrite/Select';
import TitleInput from '../PairingWrite/TitleInput';
import BodyInput from '../PairingWrite/BodyInput';
import OutLinkInput from '../PairingWrite/OutLinkInput';
import PairingOriginBook from '../PairingDetail/PairingOriginBook';
import { useNavigate, useParams } from 'react-router-dom';
import { GenterMatcherToKor } from '../../../util/GenreMatcher';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetOnePairing,
  asyncPatchPairing,
} from '../../../store/modules/pairingSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BtnStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  margin-left: -15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 641px) {
    flex-direction: row;
  }
`;

const MarginStyled = styled.div`
  margin-bottom: 10px;
  @media screen and (min-width: 641px) {
    margin-right: 5px;
  }
`;

const BookWrapperStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 5px;
  margin: 15px;
`;

export default function DeleteModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pairingId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
  };

  useEffect(() => {
    dispatch(asyncGetOnePairing(pairingId));
  }, [dispatch]);

  const pairingData = useSelector((state) => state.pairing.data.pairingRes);
  const bookData = useSelector((state) => state.pairing.data.bookRes);
  console.log('나와야해', pairingData.pairingCategory);
  console.log('나와줘', pairingData);
  const [category, categoryBind, categoryReset] = useInput(
    pairingData.pairingCategory
  );
  const [title, titleBind, titleReset] = useInput(pairingData.title);
  const [body, bodyBind, bodyReset] = useInput(pairingData.body);
  const [outLink, outLinkBind, outLinkReset] = useInput(
    pairingData.outLinkPath
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const pairingPatchBody = {
      title: title,
      body: body,
      pairingCategory: category,
      imagePath: 'img',
      outLinkPath: outLink,
    };
    dispatch(asyncPatchPairing({ pairingPatchBody, pairingId: pairingId }));
    console.log('pairingCategory', category);
    console.log('pairingPatchBody', pairingPatchBody);
    handleClose();
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
    navigate(`/pairing/${pairingId}`, { replace: true });
  };

  const resetAll = () => {
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4.16667 15.8333H5.33333L12.5208 8.64579L11.3542 7.47913L4.16667 14.6666V15.8333ZM16.0833 7.43746L12.5417 3.93746L13.7083 2.77079C14.0278 2.45135 14.4203 2.29163 14.8858 2.29163C15.3508 2.29163 15.7431 2.45135 16.0625 2.77079L17.2292 3.93746C17.5486 4.2569 17.7153 4.64246 17.7292 5.09413C17.7431 5.54524 17.5903 5.93051 17.2708 6.24996L16.0833 7.43746ZM14.875 8.66663L6.04167 17.5H2.5V13.9583L11.3333 5.12496L14.875 8.66663ZM11.9375 8.06246L11.3542 7.47913L12.5208 8.64579L11.9375 8.06246Z"
            fill="#737373"
          />
        </svg>
        <span>수정하기</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Wrapper>
            <h1>Edit your own Pairing</h1>
            <TitleWrapper>
              <MarginStyled>
                <BasicSelect categoryBind={categoryBind} />
              </MarginStyled>
              <TitleInput titleBind={titleBind} />
            </TitleWrapper>
            <BookWrapperStyled>
              <PairingOriginBook
                bookTitle={bookData.title}
                cover={bookData.cover}
                author={bookData.author}
                rating={bookData.averageRating}
                bookId={bookData.isbn13}
                disabled={true}
                publisher={bookData.publisher}
                year={bookData.pubDate}
                category={GenterMatcherToKor(bookData.genre)}
              />
            </BookWrapperStyled>
            <BodyInput bodyBind={bodyBind} />
            <OutLinkInput outLinkBind={outLinkBind} />
          </Wrapper>
          <BtnStyleBox>
            <TextButton width={'120px'} onClick={handleClose}>
              취소하기
            </TextButton>
            <TextButton onClick={resetAll}>초기화하기</TextButton>
            <ContainedButton width={'120px'} onClick={handleSubmit}>
              저장하기
            </ContainedButton>
          </BtnStyleBox>
        </Box>
      </Modal>
    </div>
  );
}
