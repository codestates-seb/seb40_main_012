import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetCuisinePairingLike,
  asyncGetCuisinePairingNewest,
  asyncGetCuisinePairingRandom,
} from '../../store/modules/cuisinePairingSlice';
const PairingCuisine = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetCuisinePairingLike());
    dispatch(asyncGetCuisinePairingNewest());
    dispatch(asyncGetCuisinePairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.cuisinePairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.cuisinePairing.newestData
  );
  const pairingRandomData = useSelector(
    (state) => state.cuisinePairing.randomData
  );

  const titleLike = '음식 및 장소에서 Hot Pairing';
  const titleNewest = '음식 및 장소에서 New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/cuisine" />
      <PairingCherryPick
        img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlJj5W%2FbtrSJypKbXg%2FidiZNLtp4UfMvKCTjcZAV0%2Fimg.jpg"
        pairingId="97"
      >
        <div>
          배추 꽃봉오리 파스타
          <br />
          책을 읽고 영화를 보면 무조건 먹어보고 싶은 그 요리!
        </div>
      </PairingCherryPick>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingCuisine;
