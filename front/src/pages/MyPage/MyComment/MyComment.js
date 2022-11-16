import Header from '../Header';
import PageContainer from '../../../components/PageContainer';
import Nav from './Nav';
import Content from './Content';
import Container from '@mui/material/Container';

const MyComment = () => {
  return (
    <PageContainer header footer>
      {/* xs , sm, md, lg, xl 사이즈 */}
      <Container maxWidth="md">
        <Header></Header>
        <Nav></Nav>
        <Content></Content>
      </Container>
    </PageContainer>
  );
};

export default MyComment;
