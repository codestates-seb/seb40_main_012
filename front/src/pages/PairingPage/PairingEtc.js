import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetEtcPairingLike,
  asyncGetEtcPairingNewest,
} from '../../store/modules/etcPairingSlice';
const PairingEtc = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetEtcPairingLike());
    dispatch(asyncGetEtcPairingNewest());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.etcPairing.likeData);
  const pairingNewestData = useSelector((state) => state.etcPairing.newestData);
  const titleLike = '기타 등등, 의외의 Hot Pairing';
  const titleNewest = '기타 등등, 의외의 New Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/etc" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
    </PageContainer>
  );
};

export default PairingEtc;
