import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetMusicPairingLike,
  asyncGetMusicPairingNewest,
  asyncGetMusicPairingRandom,
} from '../../store/modules/musicPairingSlice';
const PairingMusic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetMusicPairingLike());
    dispatch(asyncGetMusicPairingNewest());
    dispatch(asyncGetMusicPairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.musicPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.musicPairing.newestData
  );
  const pairingRandomData = useSelector(
    (state) => state.musicPairing.randomData
  );

  const titleLike = '음악과 함께하는 Hot Pairing';
  const titleNewest = '음악과 함께하는  New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/music" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingMusic;
