import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useEffect } from 'react';
import axios from 'axios';
const PairingPage = () => {
  useEffect(() => {
    const getPairingAll = async () => {
      await axios
        .get('http://localhost:8080/api/books/pairings')
        .then((res) => {
          console.log(res.data.data[0].title);
          return res.data.data;
        })
        .catch(console.error());
    };
    getPairingAll();
  }, []);
  const title = '되나..?';
  return (
    <PageContainer footer>
      <PairingTab />
      <PairingCuration title={title} />
    </PageContainer>
  );
};

export default PairingPage;
