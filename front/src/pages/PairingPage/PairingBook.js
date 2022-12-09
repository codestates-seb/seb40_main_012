import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
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
      <PairingCherryPick
        img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuxv4w%2FbtrSJn3p6bF%2FyEzkXf5dr3Tkfk3JQc6HvK%2Fimg.jpg"
        pairingId="79"
      >
        <div>
          한 쪽은 다이빙을 잘 해서 다이빙의 왕이 되고,
          <br />한 쪽은 물까지 가는데 오랜 결심이 필요하고.
        </div>
      </PairingCherryPick>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingBook;
