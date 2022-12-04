import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetEtcPairingLike,
  asyncGetEtcPairingNewest,
  asyncGetEtcPairingRandom,
} from '../../store/modules/etcPairingSlice';
const PairingEtc = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetEtcPairingLike());
    dispatch(asyncGetEtcPairingNewest());
    dispatch(asyncGetEtcPairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.etcPairing.likeData);
  const pairingNewestData = useSelector((state) => state.etcPairing.newestData);
  const pairingRandomData = useSelector((state) => state.etcPairing.randomData);
  const titleLike = '기타 등등, 의외의 Hot Pairing';
  const titleNewest = '기타 등등, 의외의 New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/etc" />
      <PairingCherryPick
        img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcn6aSw%2FbtrSLJqXE2l%2FD2NcTDiAdRsYKD6qPk6zC0%2Fimg.jpg"
        pairingId="110"
      >
        <div>
          우주를 물리의 시선에서 바라보았다면
          <br />
          이번엔 생명의 시선에서 바라보는 건 어떠세요?
        </div>
      </PairingCherryPick>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingEtc;
