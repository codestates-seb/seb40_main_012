import { PageContainer } from 'containers';
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
  const titleBest = '당신만을 위한 Best Pairing';
  const titleLike = '수많은 체리들의 선택, Hot Pairing';
  const titleNewest = '따끈따끈한 New Pairing';
  return (
    <PageContainer footer>
      <PairingTab />
      <PairingCuration title={titleBest} pairingData={pairingLikeData} />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
    </PageContainer>
  );
};

export default PairingPage;
