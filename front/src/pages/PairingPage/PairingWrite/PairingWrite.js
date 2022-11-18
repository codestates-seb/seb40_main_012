import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import PageContainer from '../../../components/PageContainer';
import PairingOriginBook from '../PairingDetail/PairingOriginBook';
import BasicSelect from './Select';
import TitleInput from './TitleInput';
import BodyInput from './BodyInput';
import OutLinkInput from './OutLinkInput';
import useInput from '../../../util/useInput';
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

const PairingWrite = () => {
  const [category, categoryBind, categoryReset] = useInput('');
  const [title, titleBind, titleReset] = useInput('');
  const [body, bodyBind, bodyReset] = useInput('');
  const [outLink, outLinkBind, outLinkReset] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pairingPostBody = {
      title: title,
      body: body,
      pairingCategory: category,
      imagePath: 'img',
      outLinkPath: outLink,
    };
    dispatch(asyncPostPairing(pairingPostBody));
    console.log(pairingPostBody);
    console.log(isLogin);
    navigate('/pairing', { replace: true });
    categoryReset();
    titleReset();
    bodyReset();
    outLinkReset();
  };

  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
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
              bookTitle="책 제목"
              author="김뫄뫄"
              rating="4.2"
              bookId="7"
              disabled={true}
            />
          </BookWrapperStyled>
          <BodyInput bodyBind={bodyBind} />
          <OutLinkInput outLinkBind={outLinkBind} />
          <button onClick={handleSubmit}>등록</button>
        </Wrapper>
      </ThemeProvider>
    </PageContainer>
  );
};

export default PairingWrite;
