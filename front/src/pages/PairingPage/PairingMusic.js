import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetMusicPairingLike,
  asyncGetMusicPairingNewest,
} from '../../store/modules/musicPairingSlice';
const PairingMusic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetMusicPairingLike());
    dispatch(asyncGetMusicPairingNewest());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.musicPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.musicPairing.newestData
  );
  const titleLike = '음악과 함께하는 Hot Pairing';
  const titleNewest = '음악과 함께하는  New Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/music" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
    </PageContainer>
  );
};

export default PairingMusic;
