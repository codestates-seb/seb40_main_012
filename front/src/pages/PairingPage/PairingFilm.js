import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetFilmPairingLike,
  asyncGetFilmPairingNewest,
  asyncGetFilmPairingRandom,
} from '../../store/modules/filmPairingSlice';
const PairingFilm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetFilmPairingLike());
    dispatch(asyncGetFilmPairingNewest());
    dispatch(asyncGetFilmPairingRandom());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.filmPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.filmPairing.newestData
  );
  const pairingRandomData = useSelector(
    (state) => state.filmPairing.randomData
  );
  const titleLike = '영화와의 만남, Hot Pairing';
  const titleNewest = '영화와의 만남, New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/film" />
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

export default PairingFilm;
