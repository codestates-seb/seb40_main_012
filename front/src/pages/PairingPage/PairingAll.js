import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetPairing } from '../../store/modules/pairingSlice';
const PairingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetPairing());
  }, [dispatch]);

  const pairingData = useSelector((state) => state.pairing.data);
  const title = '큐레이션 제목: Hot Pairing';
  return (
    <PageContainer footer>
      <PairingTab />
      <PairingCuration title={title} pairingData={pairingData} />
    </PageContainer>
  );
};

export default PairingPage;
