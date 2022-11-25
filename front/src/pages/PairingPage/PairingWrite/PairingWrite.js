import styled from 'styled-components';
import { PageContainer } from 'containers';
import PairingOriginBook from '../PairingDetail/PairingOriginBook';
import BasicSelect from './Select';
import TitleInput from './TitleInput';
import BodyInput from './BodyInput';
import OutLinkInput from './OutLinkInput';
import useInput from '../../../util/useInput';
import { ContainedButton } from '../../../components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPostPairing } from '../../../store/modules/pairingSlice';
import { selectIsLogin } from '../../../store/modules/authSlice';
import { useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);
  const curBookData = useSelector((state) => state.book.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pairingPostBody = {
      title: title,
      body: body,
      pairingCategory: category,
      imagePath: 'img',
      outLinkPath: outLink,
    };
    dispatch(asyncPostPairing({ pairingPostBody, isbn: curBookData.isbn13 }));
    console.log(pairingPostBody);
    console.log('isbn', curBookData.isbn13);
    console.log(isLogin);
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
        <OutLinkInput outLinkBind={outLinkBind} />
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
