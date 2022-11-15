import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
const PairingMusic = () => {
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/music" />
      <h1>PairingMusic</h1>
    </PageContainer>
  );
};

export default PairingMusic;
