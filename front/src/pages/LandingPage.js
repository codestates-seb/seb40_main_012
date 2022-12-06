import { PageContainer } from 'containers';
import LandingPC from './LandingPC';
import LandingMobile from './LandingMobile';
import LandingPad from './LandingPad';

const LandingPage = () => {
  return (
    <PageContainer footer center bmt={5}>
      <LandingPC />
      <LandingPad />
      <LandingMobile />
    </PageContainer>
  );
};

export default LandingPage;
