import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
const PairingMovie = () => {
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/film" />
      <h1>PairingMovie</h1>
    </PageContainer>
  );
};

export default PairingMovie;
