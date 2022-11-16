import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import PageContainer from '../../../components/PageContainer';
import CollectionDetailHeader from '../../CollectionDetailPage/CollectionDetailHeader';
import CollectionHeaderBtns from '../../CollectionDetailPage/CollectionHeaderBtns';
import CollectionTags from '../../CollectionDetailPage/CollectionTags';
import PairingOriginBook from './PairingOriginBook';

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
  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <CollectionDetailHeader
          title="미드나잇 라이브러리와 어바웃 타임"
          writer="김감자"
          update="2022.11.15"
        />
        <TagBtn>
          <CollectionTags taglist={['소설', '시간여행', '선택']} />
          <CollectionHeaderBtns />
        </TagBtn>
        <OriginBookWrapper>
          <InfoTitle>How about pairing this book</InfoTitle>
          <PairingOriginBook
            bookTitle="미드나잇 라이브러리 보다 더 긴 책제목이 생기면 어쩌지? 이보다 긴 책제목이 사실 없을 것 간긴 한데 그래도 책제목에는 리밋이 있으면 안될텐데 말이야!!"
            author="매트 헤이그"
            rating="4.9"
            bookId="28"
          ></PairingOriginBook>
        </OriginBookWrapper>
        <MainBody>
          <InfoTitle>
            With this&nbsp; <p>{'Film'}</p>
          </InfoTitle>
          <InfoContent>
            <p>여기 내용이 들어갈 겁니다</p>
          </InfoContent>
        </MainBody>
      </ThemeProvider>
    </PageContainer>
  );
};

export default PairingDetail;
