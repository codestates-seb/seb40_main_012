import EditProfileMain from './EditProfileMain';
import Container from '@mui/material/Container';

import PageContainer from '../../../components/PageContainer';

const EditProfile = () => {
  return (
    <PageContainer header footer>
      <Container maxWidth="md">
        <EditProfileMain />
      </Container>
    </PageContainer>
  );
};
export default EditProfile;
