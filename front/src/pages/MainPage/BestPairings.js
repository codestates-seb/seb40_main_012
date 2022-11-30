import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BestPairing from './BestPairing';
import MainBooksTitle from './MainBooksTitle';

const BestPairingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  margin-bottom: 100px;
  @media screen and (max-width: 640px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;

const PairingsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;

const BestPairings = () => {
  const [bestpairings, setBestpairings] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books/pairings/likes')
      .then((response) => {
        setBestpairings(response.data.data.content);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <BestPairingsContainer>
      <MainBooksTitle title="체리픽 인기 페어링" type="pairing" />
      <PairingsContainer>
        {bestpairings?.map((el) => {
          return (
            <BestPairing
              key={el.pairingId}
              pairingTitle={el.title}
              pairingId={el.pairingId}
            />
          );
        })}
        {/* {bestpairings?.slice(0, 5).map((el) => {
          return (
            <BestPairing
              key={el.pairingId}
              pairingTitle={el.title}
              pairingId={el.pairingId}
            />
          );
        })}
      </PairingsContainer>
      <PairingsContainer>
        {bestpairings?.slice(5, 10).map((el) => {
          return (
            <BestPairing
              key={el.pairingId}
              pairingTitle={el.title}
              pairingId={el.pairingId}
            />
          );
        })} */}
      </PairingsContainer>
    </BestPairingsContainer>
  );
};

export default BestPairings;
