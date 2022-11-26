import styled from 'styled-components';
import PageContainer from '../../../components/PageContainer';
import PairingOriginBook from '../PairingDetail/PairingOriginBook';
import BasicSelect from './Select';
import TitleInput from './TitleInput';
import BodyInput from './BodyInput';
import OutLinkInput from './OutLinkInput';
import useInput from '../../../util/useInput';
import { ContainedButton } from '../../../components/Buttons';
import { useSelector } from 'react-redux';
//원래로 되돌리기!! (10번 주석처리하고 12,13 둘다 주석 해제)
// import { useDispatch useSelector } from 'react-redux';
// import { asyncPostPairing } from '../../../store/modules/pairingSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../../api/axios';

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

const WarningMsg = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  font-size: 14px;
  div {
    background-color: #ffc5c5;
    padding: 8px;
    font-weight: 700;
    color: #850000;
    border-radius: 3px;
    width: 99%;
  }
`;

const PairingWrite = () => {
  const [category, categoryBind, categoryReset] = useInput('');
  const [title, titleBind, titleReset] = useInput('');
  const [body, bodyBind, bodyReset] = useInput('');
  const [outLink, outLinkBind, outLinkReset] = useInput('');
  const [imgData, setImgData] = useState({});
  //원래로 되돌리기!! 주석 해제
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const curBookData = useSelector((state) => state.book.data);

  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log('uploadFile', uploadFile);
      setImgData(uploadFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pairingPostBody = {
      title: title,
      body: body,
      pairingCategory: category,
      outLinkPath: outLink,
    };
    console.log('ff', imgData);
    const formData = new FormData();
    formData.append('image', imgData);
    formData.append('postResponseDto', pairingPostBody);
    //원래로 되돌리기!!(147번 주석처리하고 149 주석 해제)
    // dispatch(asyncPostPairing({ pairingPostBody, isbn: curBookData.isbn13 }));
    const isbn = curBookData.isbn13;
    await axios.post(`/api/books/${isbn}/pairings/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/pairing', { replace: true });
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
  };

  return (
    <PageContainer footer>
      <Wrapper>
        <h1>Write your own Pairing</h1>
        <TitleWrapper>
          <MarginStyled>
            <BasicSelect categoryBind={categoryBind} />
          </MarginStyled>
          <TitleInput titleBind={titleBind} />
        </TitleWrapper>
        <BookWrapperStyled>
          <PairingOriginBook
            bookTitle={curBookData.title}
            cover={curBookData.cover}
            author={curBookData.author}
            rating={curBookData.averageRating}
            bookId={curBookData.isbn13}
            disabled={true}
            publisher={curBookData.publisher}
            year={curBookData.pubDate}
            category={curBookData.genre}
          />
        </BookWrapperStyled>
        <BodyInput bodyBind={bodyBind} />
        <LinkAndImgWrapperStyled>
          <OutLinkInput outLinkBind={outLinkBind} />
          <label htmlFor="upload" className="imgLabel">
            <Imgbtn>이미지 업로드</Imgbtn>
            <span className="imgName">{imgData?.name}</span>
          </label>
          <input id="upload" type="file" onChange={onChangeImg} />
        </LinkAndImgWrapperStyled>
        {category === '' || title === '' ? (
          <WarningMsg>
            <div>카테고리와 제목을 입력해주세요</div>
          </WarningMsg>
        ) : (
          <ContainedButton onClick={handleSubmit}>등록</ContainedButton>
        )}
      </Wrapper>
    </PageContainer>
  );
};

export default PairingWrite;
