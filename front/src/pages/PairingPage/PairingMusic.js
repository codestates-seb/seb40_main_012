import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
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
      <PairingCherryPick
        img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F80o0S%2FbtrSI8SMN6u%2FTYXRpMdwHyv1vsEfexuZk0%2Fimg.jpg"
        pairingId="9"
      >
        <div>
          듣고 있으면 사막에 와있는 것 같은 느낌
          <br />
          원작을 읽으며 듣는다면 훨씬 몰입할 수 있을 것
        </div>
      </PairingCherryPick>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingMusic;
