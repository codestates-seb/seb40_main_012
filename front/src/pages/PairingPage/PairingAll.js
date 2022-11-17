import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetAllPairingLike,
  asyncGetAllPairingNewest,
} from '../../store/modules/allPairingSlice';
const PairingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllPairingLike());
    dispatch(asyncGetAllPairingNewest());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.allPairing.likeData);
  const pairingNewestData = useSelector((state) => state.allPairing.newestData);
  const titleLike = '큐레이션 제목: Hot Pairing';
  const titleNewest = '큐레이션 제목: New Pairing';
  return (
    <PageContainer footer>
      <PairingTab />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
    </PageContainer>
  );
};

export default PairingPage;
