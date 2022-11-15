import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
const PairingFood = () => {
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/cuisine" />
      <h1>PairingFood</h1>
    </PageContainer>
  );
};

export default PairingFood;
