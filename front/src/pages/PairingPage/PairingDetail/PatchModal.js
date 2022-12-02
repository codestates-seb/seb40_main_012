import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { TextButton, ContainedButton } from '../../../components/Buttons';
import useInput from '../../../hooks/useInput';
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

const LinkAndImgWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (min-width: 641px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .imgLabel {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 7px;
    margin-bottom: 10px;
  }
  .imgName {
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.gray};
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const Imgbtn = styled.div`
  background-color: ${({ theme }) => theme.colors.purple_3};
  padding: 15px 60px;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 5px;
  @media screen and (min-width: 641px) {
    padding: 15px 30px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
`;

const Btns = styled.button`
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

const WarningMsg = styled.div`
  padding: 0 10px;
  font-size: 13px;
  display: flex;
  div {
    background-color: #ffc5c5;
    padding: 8px;
    font-weight: 700;
    color: #850000;
    border-radius: 3px;
  }
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

  const [category, categoryBind, categoryReset] = useInput(
    pairingData.pairingCategory
  );
  const [title, titleBind, titleReset] = useInput(pairingData.title);
  const [body, bodyBind, bodyReset] = useInput(pairingData.body);
  const [outLink, outLinkBind, outLinkReset] = useInput(
    pairingData.outLinkPath
  );
  const [imgData, setImgData] = useState({});

  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setImgData(uploadFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pairingPatchBody = {
      title: title,
      body: body,
      pairingCategory: category,
      outLinkPath: outLink,
    };
    const formData = new FormData();
    formData.append('image', imgData);
    formData.append(
      'patchPairingDto',
      new Blob([JSON.stringify(pairingPatchBody)], {
        type: 'application/json',
      })
    );
    dispatch(asyncPatchPairing({ formData, pairingId: pairingId }));
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
      <Btns onClick={handleOpen}>수정하기</Btns>
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
            <LinkAndImgWrapperStyled>
              <OutLinkInput outLinkBind={outLinkBind} />
              <label htmlFor="upload" className="imgLabel">
                <Imgbtn>이미지 업로드</Imgbtn>
                <span className="imgName">{imgData?.name}</span>
              </label>
              <input
                id="upload"
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={onChangeImg}
              />
            </LinkAndImgWrapperStyled>
          </Wrapper>
          <BtnStyleBox>
            <TextButton width={'120px'} onClick={handleClose}>
              취소하기
            </TextButton>
            <TextButton onClick={resetAll}>초기화하기</TextButton>
            {category === '' || title === '' ? (
              <WarningMsg>
                <div>카테고리와 제목을 입력해주세요</div>
              </WarningMsg>
            ) : (
              <ContainedButton width={'120px'} onClick={handleSubmit}>
                저장하기
              </ContainedButton>
            )}
          </BtnStyleBox>
        </Box>
      </Modal>
    </div>
  );
}
