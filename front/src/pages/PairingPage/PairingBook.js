import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
const PairingBook = () => {
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/book" />
      <h1>PairingBook</h1>
    </PageContainer>
  );
};

export default PairingBook;
