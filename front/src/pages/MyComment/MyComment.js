import Header from './Header';
import PageContainer from '../../components/PageContainer';
import Nav from './Nav';
import Content from './Content';
const MyComment = () => {
  return (
    <PageContainer header footer>
      {/* xs , sm, md, lg, xl 사이즈 */}
      <Header></Header>
      <Nav></Nav>
      <Content></Content>
    </PageContainer>
  );
};

export default MyComment;
