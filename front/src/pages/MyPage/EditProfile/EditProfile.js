import EditProfileHeader from './EditProfileHeader';
import Container from '@mui/material/Container';
import PageContainer from '../../../components/PageContainer';

const EditProfile = () => {
  return (
    <PageContainer header footer>
      <Container maxWidth="md">
        <EditProfileHeader></EditProfileHeader>
      </Container>
    </PageContainer>
  );
};
export default EditProfile;
