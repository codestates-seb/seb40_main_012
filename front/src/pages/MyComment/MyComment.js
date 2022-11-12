import Header from './Header';
import PageContainer from '../../components/PageContainer';
import Nav from './Nav';
const MyComment = () => {
  return (
    <PageContainer header footer>
      {/* xs , sm, md, lg, xl 사이즈 */}
      <Header></Header>
      <Nav></Nav>
    </PageContainer>
  );
};

export default MyComment;
