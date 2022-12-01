import styled from 'styled-components';
import { PageContainer } from 'containers';
import PairingOriginBook from '../PairingPage/PairingDetail/PairingOriginBook';
import RateModal from './RateModal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookAsync } from '../../store/modules/bookSlice';
import { GenterMatcherToKor } from '../../util/GenreMatcher';
import { ToDateString } from '../../util/ToDateString';
import { BasicButton, FillButton } from '../../components/Buttons';
import { selectIsLogin, selectEmail } from '../../store/modules/authSlice';
import Comment from '../../components/Comments/Comment';
import PickButton from '../PairingPage/PairingDetail/PickButton';
import NeedLoginModal from '../PairingPage/PairingDetail/NeedLoginModal';
import LinkCopyModal from '../../components/LinkCopyModal';
import BookCommentsModal from './BookCommentsModal';
import MyComment from './MyComment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../components/CarouselArrows';
import axios from '../../api/axios';
import CollectionSmallBooks from '../../pages/CollectionPage/CollectionSmallSet/CollectionSmallBooks';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PairingStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const BestPairingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  color: white;
  border-radius: 5px;
  margin: 0px 0px 10px 10px;
  span {
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: none;
  }
  @media screen and (min-width: 1180px) {
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    right: 100px;
    top: 100px;
    width: 300px;
    height: 300px;
    div {
      display: flex;
      align-items: center;
    }
  }
  width: 97%;
  height: 50px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const SlickSlider = styled.div`
  width: 100%;
  //기본 arrow 삭제
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-next {
    right: 20px;
    top: 47%;
  }
  .slick-prev {
    left: 22px;
    top: 47%;
    z-index: 100;
  }
`;

const PairingContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  width: 30%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  margin: 7px;
  position: relative;
  .slideTitle {
    margin-top: 40%;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  @media screen and (min-width: 640px) {
    font-size: 18px;
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
  p {
    margin: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 10px;
  button {
    margin: 0 3px;
  }
  justify-content: space-between;
`;

const RowBox = styled.div`
  display: flex;
  align-items: center;
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

const EmptyStyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
`;

const CommentBtnStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BookDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isbn } = useParams();
  const isLogin = useSelector(selectIsLogin);
  const userEmail = useSelector(selectEmail);
  const location = useLocation();

  const initialState = {
    adult: null,
    author: '',
    averageRating: 0,
    bestPairing: {},
    bookCollectionCount: '',
    bookCollections: {},
    bookmarked: false,
    commentCount: 0,
    comments: {},
    cover: null,
    description: null,
    genre: '',
    isbn13: '',
    itemPage: null,
    myComment: null,
    myRating: 0,
    pairingCount: 0,
    pairings: {},
    pubDate: null,
    publisher: null,
    ratingCount: 0,
    subTitle: null,
    title: '',
    view: 0,
  };

  const [bookData, setBookData] = useState(initialState);

  useEffect(() => {
    dispatch(getBookAsync(isbn))
      .unwrap()
      .catch((error) => {
        if (error.status === 500) {
          navigate('/404');
        }
      });
    getBookData(isbn);
  }, []);

  const getBookData = () => {
    axios
      .get(`/api/books/${isbn}`)
      .then((res) => {
        setBookData(res.data.data);
      })
      .catch((error) => console.error(error));
  };

  const handleBookmark = () => {
    if (isLogin) {
      axios
        .post(`/api/books/${isbn}/bookmark`)
        .then(() => getBookData())
        .catch((error) => console.error(error));
    }
  };

  const handleRating = (ratingBody) => {
    axios
      .patch(`/api/books/${isbn}/rating`, ratingBody)
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const handleCommentAdd = (commentBody) => {
    axios
      .post(`/api/books/${isbn}/comments/add`, commentBody)
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`/api/comments/${commentId}/delete`)
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const handleCommentEdit = (commentId, commentBody) => {
    axios
      .patch(`/api/books/${commentId}/edit`, {
        commentBody,
      })
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const handleCommentLike = (commentId) => {
    axios
      .patch(`/api/comments/${commentId}/like`)
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const handleCommentDislike = (commentId) => {
    axios
      .patch(`/api/comments/${commentId}/dislike`)
      .then(() => {
        getBookData();
      })
      .catch((error) => console.error(error));
  };

  const navToWrite = () => {
    navigate('/pairing/write');
  };

  const navToPairingContent = (pairingId) => {
    navigate(`/pairing/${pairingId}`);
  };

  const commentsTopThree = bookData?.comments?.content?.slice(0, 3);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          cover={bookData?.cover}
          bookId={bookData?.isbn13}
          bookTitle={bookData?.title}
          author={bookData?.author}
          publisher={bookData?.publisher}
          year={bookData?.pubDate && ToDateString(bookData.pubDate)}
          category={GenterMatcherToKor(bookData?.genre)}
          rating={bookData?.averageRating}
        />
        {bookData?.bestPairing ? (
          <BestPairingBox
            img={bookData?.bestPairing?.imagePath}
            color={bookData?.bestPairing?.imagePath ? null : '#A28BFF'}
            onClick={() => {
              navToPairingContent(bookData?.bestPairing?.pairingId);
            }}
          >
            <div>BestPairing</div>
            <span>{bookData?.bestPairing?.title}</span>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'}
                alt="heart icon"
              />
              {bookData?.bestPairing?.likeCount}
            </div>
          </BestPairingBox>
        ) : null}
        <ButtonContainer>
          <RowBox>
            {isLogin ? (
              <RateModal
                isbn={isbn}
                bookData={bookData}
                setBookData={setBookData}
                getBookData={getBookData}
                handleRating={handleRating}
                handleCommentAdd={handleCommentAdd}
                handleCommentEdit={handleCommentEdit}
              />
            ) : (
              <NeedLoginModal>
                <FillButton>평가하기</FillButton>
              </NeedLoginModal>
            )}

            {isLogin ? (
              <BasicButton onClick={navToWrite}>페어링 작성하기</BasicButton>
            ) : (
              <NeedLoginModal>
                <BasicButton>페어링 작성하기</BasicButton>
              </NeedLoginModal>
            )}
          </RowBox>
          <RowBox>
            <PickButton
              isBookmarked={bookData?.bookmarked}
              handleBookmark={handleBookmark}
            ></PickButton>
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
          </RowBox>
        </ButtonContainer>
        <DescContainer>
          <h1>기본 정보</h1>
          {bookData?.subTitle ? <p>부제: {bookData.subTitle}</p> : null}
          {bookData?.itemPage ? <p>페이지: {bookData.itemPage}</p> : null}
          {bookData?.description ? <p>{bookData.description}</p> : null}
          {bookData?.adult === true ? <p>🔞19세 이상 독서 가능</p> : null}
        </DescContainer>
        <DescContainer>
          <h1>코멘트 {bookData?.comments?.content?.length}</h1>
          {bookData?.myRating || bookData?.myComment ? (
            <MyComment
              isbn={isbn}
              getBookData={getBookData}
              myComment={bookData.myComment}
              myRating={bookData.myRating}
              commentId={bookData.myComment?.commentId}
              handleCommentDelete={handleCommentDelete}
            />
          ) : null}
          {commentsTopThree?.length === 0 ? (
            <EmptyStyledBox>
              <p>첫 코멘트를 등록해보세요!</p>
            </EmptyStyledBox>
          ) : (
            commentsTopThree?.map((el) => {
              return (
                <Comment
                  key={el?.commentId}
                  data={el}
                  isLogin={isLogin}
                  userEmail={userEmail}
                  commentId={el.commentId}
                  commentDelete={handleCommentDelete}
                  commentLike={handleCommentLike}
                  commentDislike={handleCommentDislike}
                  type="bookcomment"
                />
              );
            })
          )}
          {commentsTopThree?.length === 0 ||
          bookData?.comments?.content?.length < 4 ? null : (
            <CommentBtnStyled>
              <BookCommentsModal
                data={bookData?.comments?.content}
                isLogin={isLogin}
                userEmail={userEmail}
                handleCommentDelete={handleCommentDelete}
                handleCommentLike={handleCommentLike}
                handleCommentDislike={handleCommentDislike}
              />
            </CommentBtnStyled>
          )}
        </DescContainer>
        <DescContainer>
          <h1>이 책과 같이 보면 좋은 페어링 {bookData?.pairingCount}</h1>
          <PairingStyled>
            {bookData?.pairingCount === 0 ? (
              <EmptyStyledBox>
                <p>첫 페어링을 등록해보세요!</p>
              </EmptyStyledBox>
            ) : bookData?.pairings?.content?.length > 4 ? (
              <SlickSlider>
                <Slider {...sliderSettings}>
                  {bookData?.pairings?.content?.map((el) => {
                    return (
                      <PairingContents
                        key={el.pairingId}
                        img={el.imagePath}
                        color={el.imagePath ? null : '#A28BFF'}
                        onClick={() => {
                          navToPairingContent(el.pairingId);
                        }}
                      >
                        <div className="slideTitle">{el.title}</div>
                      </PairingContents>
                    );
                  })}
                </Slider>
              </SlickSlider>
            ) : (
              bookData?.pairings?.content?.map((el) => {
                return (
                  <PairingContents
                    key={el.pairingId}
                    img={el.imagePath}
                    color={el.imagePath ? null : '#A28BFF'}
                    onClick={() => {
                      navToPairingContent(el.pairingId);
                    }}
                  >
                    <div>{el.title}</div>
                  </PairingContents>
                );
              })
            )}
          </PairingStyled>
        </DescContainer>
        <DescContainer>
          <h1>이 책이 포함된 컬렉션 {bookData?.bookCollectionCount}</h1>
          {bookData?.bookCollectionCount === 0 ? (
            <EmptyStyledBox>
              <p>첫 컬렉션을 등록해보세요!</p>
            </EmptyStyledBox>
          ) : bookData?.bookCollectionCount < 5 ? (
            <RowBox>
              {bookData?.bookCollections?.content?.map((el) => {
                return (
                  <CollectionSmallBooks
                    key={el.collectionId}
                    collectionId={el.collectionId}
                    title={el.title}
                    books={el.collectionCover}
                    type="small"
                  />
                );
              })}
            </RowBox>
          ) : (
            <SlickSlider>
              <Slider {...sliderSettings}>
                {bookData?.bookCollections?.content?.map((el) => {
                  return (
                    <CollectionSmallBooks
                      key={el.collectionId}
                      collectionId={el.collectionId}
                      title={el.title}
                      books={el.collectionCover}
                    />
                  );
                })}
              </Slider>
            </SlickSlider>
          )}
        </DescContainer>
      </Wrapper>
    </PageContainer>
  );
};

export default BookDetail;
