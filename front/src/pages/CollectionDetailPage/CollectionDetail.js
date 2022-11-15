import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import CollectionDetailHeader from './CollectionDetailHeader';
import CollectionTags from './CollectionTags';
import CollectionHeaderBtns from './CollectionHeaderBtns';
import CollectionIntro from './CollectionIntro';
import CollectionDetailBooks from './CollectionDetailBooks';

const CollectionTagBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

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
      </ThemeProvider>
    </PageContainer>
  );
};

export default CollectionDetailPage;
