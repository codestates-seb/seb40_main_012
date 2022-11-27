import styled from 'styled-components';
import { PageContainer } from 'containers';
import PairingOriginBook from '../PairingPage/PairingDetail/PairingOriginBook';
import RateModal from './RateModal';
import BestPairing from '../MainPage/BestPairing';
// import Comment from '../../components/Comments/Comment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookAsync } from '../../store/modules/bookSlice';
import { GenterMatcherToKor } from '../../util/GenreMatcher';
import { ToDateString } from '../../util/ToDateString';
import { BasicButton } from '../../components/Buttons';
import { selectIsLogin } from '../../store/modules/authSlice';
import NeedLoginModal from '../PairingPage/PairingDetail/NeedLoginModal';
import LinkCopyModal from '../../components/LinkCopyModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PairingStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (min-width: 641px) {
    flex-direction: row;
  }
`;

const DescContainer = styled.div`
  display: flex;
  margin-left: 15px;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
  h1 {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 0 20px 10px;
  button {
    margin: 0 3px;
  }
  justify-content: space-between;
`;

const ShareBtnContainer = styled.div`
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

const BookDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isbn } = useParams();
  const isLogin = useSelector(selectIsLogin);
  const location = useLocation();

  useEffect(() => {
    dispatch(getBookAsync(isbn));
  }, [dispatch]);
  const bookData = useSelector((state) => state.book.data);

  console.log('bookData', bookData);

  const navToWrite = () => {
    navigate('/pairing/write');
  };

  //LinkCopy Modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <PageContainer footer>
      <Wrapper>
        <PairingOriginBook
          disabled={true}
          cover={bookData.cover}
          bookId={bookData.isbn13}
          bookTitle={bookData.title}
          author={bookData.author}
          publisher={bookData.publisher}
          year={bookData.pubDate && ToDateString(bookData.pubDate)}
          category={GenterMatcherToKor(bookData.genre)}
          rating={bookData.averageRating}
        />
        <ButtonContainer>
          <div>
            <RateModal />
            {isLogin ? (
              <BasicButton onClick={navToWrite}>페어링 작성하기</BasicButton>
            ) : (
              <NeedLoginModal>
                <BasicButton>페어링 작성하기</BasicButton>
              </NeedLoginModal>
            )}
          </div>
          <ShareBtnContainer onClick={handleModalOpen} rolo="presentation">
            <img
              src={process.env.PUBLIC_URL + '/images/share_icon.svg'}
              alt="share icon"
            />
            공유하기
          </ShareBtnContainer>
          <LinkCopyModal
            modalOpen={modalOpen}
            handleClose={handleModalClose}
            link={location.pathname}
            type="책에 대한 생각들을"
          />
        </ButtonContainer>
        <DescContainer>
          <h1>기본 정보</h1>
          <p>부제: {bookData.subTitle}</p>
          <p>페이지: {bookData.itemPage}</p>
          <p>설명: {`${bookData.description}`}</p>
          {bookData.adult === true ? <p>19세 이상 독서 가능</p> : null}
        </DescContainer>
        <DescContainer>
          <h1>코멘트</h1>
          {bookData.comments?.empty !== true ? (
            // <Comment data={bookData.comments.contents} />
            <h1>코멘트</h1>
          ) : null}
        </DescContainer>
        <DescContainer>
          <h1>이 책과 같이 보면 좋은 페어링</h1>
          <PairingStyled>
            {bookData.pairings?.contents && bookData.pairings?.empty !== true
              ? bookData.pairings.contents.map((el) => {
                  return (
                    <BestPairing
                      key={el.pairingId}
                      pairingTitle={el.title}
                      pairingId={el.pairingId}
                    />
                  );
                })
              : null}
          </PairingStyled>
        </DescContainer>
        <DescContainer>
          <h1>이 책이 포함된 컬렉션</h1>
        </DescContainer>
        <DescContainer>
          <h1>비슷한 책</h1>
        </DescContainer>
      </Wrapper>
    </PageContainer>
  );
};

export default BookDetail;
