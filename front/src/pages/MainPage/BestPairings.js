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
`;

const PairingsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
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
      <MainBooksTitle title="요즘 뜨는 페어링" type="pairing" />
      <PairingsContainer>
        {bestpairings?.slice(0, 5).map((el) => {
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
        {bestpairings.slice(5, 10).map((el) => {
          return (
            <BestPairing
              key={el.pairingId}
              pairingTitle={el.title}
              pairingId={el.pairingId}
            />
          );
        })}
      </PairingsContainer>
    </BestPairingsContainer>
  );
};

export default BestPairings;
