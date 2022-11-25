import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetFilmPairingLike,
  asyncGetFilmPairingNewest,
} from '../../store/modules/filmPairingSlice';
const PairingFilm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetFilmPairingLike());
    dispatch(asyncGetFilmPairingNewest());
  }, [dispatch]);

  const pairingLikeData = useSelector((state) => state.filmPairing.likeData);
  const pairingNewestData = useSelector(
    (state) => state.filmPairing.newestData
  );
  const titleLike = '영화와의 만남, Hot Pairing';
  const titleNewest = '영화와의 만남, New Pairing';
  return (
    <PageContainer footer>
      <PairingTab pathname="/pairing/film" />
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
    </PageContainer>
  );
};

export default PairingFilm;
