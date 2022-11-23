import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import PageContainer from '../../../components/PageContainer';
import CollectionDetailHeader from '../../CollectionDetailPage/CollectionDetailHeader';
import CollectionHeaderBtns from '../../CollectionDetailPage/CollectionHeaderBtns';
import PairingOriginBook from './PairingOriginBook';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetOnePairing,
  asyncPostPairingComment,
  asyncDeletePairingComment,
  asyncEditPairingComment,
  asyncLikePairingComment,
} from '../../../store/modules/pairingSlice';
import { selectEmail } from '../../../store/modules/authSlice';
import Comments from '../../../components/Comments/Comments';
import DeleteModal from './DeleteModal';

const BtnStyleBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const EditModeStyleBox = styled.div`
  display: flex;
  button {
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
`;

const OriginBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const InfoTitle = styled.div`
  margin: 10px 0px 0px 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  p {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
const InfoContent = styled.div`
  margin: 10px 0px 0px 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const PairingDetail = () => {
  const dispatch = useDispatch();
  const { pairingId } = useParams();
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    dispatch(asyncGetOnePairing(pairingId));
  }, [dispatch]);
  const pairingData = useSelector((state) => state.pairing.data.pairingRes);
  const bookData = useSelector((state) => state.pairing.data.bookRes);
  useEffect(() => {
    setIsMine(userEmail === pairingData.userInformation?.email);
  }, [dispatch, pairingData, isMine]);

  const userEmail = useSelector(selectEmail);

  const handleCommentAdd = (body) => {
    //dispatch - 코멘트 입력
    dispatch(asyncPostPairingComment({ pairingId, body }));
  };

  const handleCommentDelete = (commentId) => {
    //dispatch - 코멘트 삭제
    dispatch(asyncDeletePairingComment(commentId));
  };

  const handleCommentEdit = (commentId, body) => {
    dispatch(asyncEditPairingComment({ commentId, body }));
  };

  const handleCommentLike = (commentId) => {
    dispatch(asyncLikePairingComment(commentId));
  };

  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <CollectionDetailHeader
          title={pairingData.title}
          writer={
            pairingData.userInformation && pairingData.userInformation.nickName
          }
          update={new Date(pairingData.modifiedAt).toLocaleDateString()}
        />
        <BtnStyleBox>
          {isMine ? (
            <EditModeStyleBox>
              <button>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16667 15.8333H5.33333L12.5208 8.64579L11.3542 7.47913L4.16667 14.6666V15.8333ZM16.0833 7.43746L12.5417 3.93746L13.7083 2.77079C14.0278 2.45135 14.4203 2.29163 14.8858 2.29163C15.3508 2.29163 15.7431 2.45135 16.0625 2.77079L17.2292 3.93746C17.5486 4.2569 17.7153 4.64246 17.7292 5.09413C17.7431 5.54524 17.5903 5.93051 17.2708 6.24996L16.0833 7.43746ZM14.875 8.66663L6.04167 17.5H2.5V13.9583L11.3333 5.12496L14.875 8.66663ZM11.9375 8.06246L11.3542 7.47913L12.5208 8.64579L11.9375 8.06246Z"
                    fill="#737373"
                  />
                </svg>
                <span>수정하기</span>
              </button>
              <DeleteModal deleteId={pairingData.pairingId} />
            </EditModeStyleBox>
          ) : (
            <div></div>
          )}

          <CollectionHeaderBtns />
        </BtnStyleBox>
        <OriginBookWrapper>
          <InfoTitle>How about pairing this book</InfoTitle>
          <PairingOriginBook
            bookTitle={bookData.title}
            author={bookData.author}
            cover={bookData.cover}
            publisher={bookData.publisher}
            year={bookData.pubDate}
            category={bookData.genre}
            rating={bookData.averageRating}
            bookId={pairingData.isbn13}
            disabled={false}
          ></PairingOriginBook>
        </OriginBookWrapper>
        <MainBody>
          <InfoTitle>
            With this&nbsp; <p>{pairingData.pairingCategory}</p>
          </InfoTitle>
          <InfoContent>
            <p>{pairingData.body}</p>
            <a
              href={pairingData.outLinkPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pairingData.outLinkPath}
            </a>
          </InfoContent>
        </MainBody>
        <Comments
          commentsData={pairingData.comments}
          commentAdd={handleCommentAdd}
          commentDelete={handleCommentDelete}
          commentEdit={handleCommentEdit}
          commentLike={handleCommentLike}
        />
      </ThemeProvider>
    </PageContainer>
  );
};

export default PairingDetail;
