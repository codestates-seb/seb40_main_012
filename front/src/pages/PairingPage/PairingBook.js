import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetBookPairingLike,
  asyncGetBookPairingNewest,
  asyncGetBookPairingRandom,
} from '../../store/modules/bookPairingSlice';
const PairingBook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetBookPairingLike());
    dispatch(asyncGetBookPairingNewest());
    dispatch(asyncGetBookPairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.bookPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.bookPairing.newestData
  );
  const pairingRandomData = useSelector(
    (state) => state.bookPairing.randomData
  );
  const titleLike = '책과 책을 잇는 Hot Pairing';
  const titleNewest = '책과 책을 잇는 New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/book" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingBook;
