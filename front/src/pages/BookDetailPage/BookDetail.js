import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import PairingOriginBook from '../PairingPage/PairingDetail/PairingOriginBook';
import RateModal from './RateModal';
import BestPairing from '../MainPage/BestPairing';
// import Comment from '../../components/Comments/Comment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookAsync } from '../../store/modules/bookSlice';
import { GenterMatcherToKor } from '../../util/GenreMatcher';
import { ToDateString } from '../../util/ToDateString';
import { BasicButton } from '../../components/Buttons';

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

const BookDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isbn } = useParams();
  useEffect(() => {
    dispatch(getBookAsync(isbn));
  }, [dispatch]);
  const bookData = useSelector((state) => state.book.data);

  console.log('bookData', bookData);

  const navToWrite = () => {
    navigate('/pairing/write');
  };

  return (
    <ThemeProvider theme={theme}>
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
          <RateModal />
          <BasicButton onClick={navToWrite}>페어링 작성하기</BasicButton>
          <DescContainer>
            <h1>기본 정보</h1>
            <p>부제: {bookData.subTitle}</p>
            <p>페이지: {bookData.itemPage}</p>
            <p>설명: {`${bookData.description}`}</p>
            {bookData.adult === true ? <p>19세 이상 독서 가능</p> : null}
          </DescContainer>
          <DescContainer>
            <h1>코멘트</h1>
            {bookData.comments && bookData.comments.empty !== true ? (
              // <Comment data={bookData.comments.contents} />
              <h1>코멘트</h1>
            ) : null}
          </DescContainer>
          <DescContainer>
            <h1>이 책과 같이 보면 좋은 페어링</h1>
            <PairingStyled>
              {bookData.pairings &&
              bookData.pairings.contents &&
              bookData.pairings.empty !== true
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
    </ThemeProvider>
  );
};

export default BookDetail;
