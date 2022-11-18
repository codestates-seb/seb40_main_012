import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import CollectionDetailHeader from './CollectionDetailHeader';
import CollectionTags from './CollectionTags';
import CollectionHeaderBtns from './CollectionHeaderBtns';
import CollectionIntro from './CollectionIntro';
import CollectionDetailBooks from './CollectionDetailBooks';
import Comments from '../../components/Comments/Comments';
import { comment } from 'postcss';

const CollectionTagBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const commentsData = [
  {
    commentId: 1,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
  {
    commentId: 2,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1 Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
  {
    commentId: 3,
    userInformation: {
      email: 'hayoung_sama@email.com',
      nickName: '하영사마',
      roles: null,
    },
    commentType: 'BOOK',
    body: 'Stub_Pairing_Comment_Body_1',
    likeCount: 86,
    view: 0,
    createdAt: '2022-11-18T10:22:49.79899',
    modifiedAt: '2022-11-18T10:22:49.799009',
  },
];

const commentAdd = (content) => {
  console.log('comment 작성: ', content);
  //dispatch
};

const CollectionDetailPage = () => {
  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <CollectionDetailHeader
          title="재밌는 책 컬렉션"
          writer="김뫄뫄"
          update="2022.11.15"
        />
        <CollectionTagBtn>
          <CollectionTags taglist={['소설', 'sf', '시리즈물']} />
          <CollectionHeaderBtns />
        </CollectionTagBtn>
        <CollectionIntro intro="뫄뫄하고 재밌는 컬렉션입니다!" />
        <CollectionDetailBooks />
        <Comments commentsData={commentsData} commentAdd={commentAdd} />
      </ThemeProvider>
    </PageContainer>
  );
};

export default CollectionDetailPage;
