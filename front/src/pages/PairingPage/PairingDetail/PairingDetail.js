import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import PageContainer from '../../../components/PageContainer';
import CollectionDetailHeader from '../../CollectionDetailPage/CollectionDetailHeader';
import CollectionHeaderBtns from '../../CollectionDetailPage/CollectionHeaderBtns';
import CollectionTags from '../../CollectionDetailPage/CollectionTags';
import PairingOriginBook from './PairingOriginBook';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetOnePairing } from '../../../store/modules/pairingSlice';

import Comments from '../../../components/Comments/Comments';

const commentAdd = (content) => {
  console.log('comment 작성: ', content);
  //dispatch
};

const TagBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
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
  useEffect(() => {
    dispatch(asyncGetOnePairing(pairingId));
  }, [dispatch]);
  const pairingData = useSelector((state) => state.pairing.data);
  console.log(pairingData);
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
        <TagBtn>
          <CollectionTags taglist={['소설', '시간여행', '선택']} />
          <CollectionHeaderBtns />
        </TagBtn>
        <OriginBookWrapper>
          <InfoTitle>How about pairing this book</InfoTitle>
          <PairingOriginBook
            bookTitle="만약 엄청나게 긴 책제목이 있으먼 어쩌지? 이보다 긴 책제목이 사실 없을 것 간긴 한데 그래도 책제목에는 리밋이 있으면 안될텐데 말이야!!"
            author="달리는 감자"
            rating="4.9"
            bookId="28"
          ></PairingOriginBook>
        </OriginBookWrapper>
        <MainBody>
          <InfoTitle>
            With this&nbsp; <p>{pairingData.pairingCategory}</p>
          </InfoTitle>
          <InfoContent>
            <p>{pairingData.body}</p>
            <a href="/">{pairingData.outLinkPath}</a>
          </InfoContent>
        </MainBody>
        <Comments commentsData={pairingData.comments} commentAdd={commentAdd} />
      </ThemeProvider>
    </PageContainer>
  );
};

export default PairingDetail;
