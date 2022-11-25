import PageContainer from '../../components/PageContainer';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetBookPairingLike,
  asyncGetBookPairingNewest,
} from '../../store/modules/bookPairingSlice';
const PairingBook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetBookPairingLike());
    dispatch(asyncGetBookPairingNewest());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.bookPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.bookPairing.newestData
  );
  const titleLike = '책과 책을 잇는 Hot Pairing';
  const titleNewest = '책과 책을 잇는 New Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/book" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
    </PageContainer>
  );
};

export default PairingBook;
