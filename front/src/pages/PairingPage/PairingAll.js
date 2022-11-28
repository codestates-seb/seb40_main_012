import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetAllPairingLike,
  asyncGetAllPairingNewest,
  asyncGetAllPairingRandom,
} from '../../store/modules/allPairingSlice';
const PairingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllPairingLike());
    dispatch(asyncGetAllPairingNewest());
    dispatch(asyncGetAllPairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.allPairing.likeData);
  const pairingNewestData = useSelector((state) => state.allPairing.newestData);
  const pairingRandomData = useSelector((state) => state.allPairing.randomData);
  const titleLike = '수많은 체리들의 선택, Hot Pairing';
  const titleNewest = '따끈따끈한 New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab />
      <PairingCherryPick />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingPage;
