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
      <PairingCherryPick
        img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE2Let%2FbtrSHvnEktD%2FW1gIdYDKXQ2N57w75pQgDk%2Fimg.jpg"
        pairingId="4"
      >
        <div>
          세상을 홀로 견디는 기분.
          <br />
          우주도, 지구도, 서울도 똑같은 마음으로 여행중인 당신을 위해.
        </div>
      </PairingCherryPick>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingPage;
