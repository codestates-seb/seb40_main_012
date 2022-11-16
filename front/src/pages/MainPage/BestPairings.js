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
`;

const BestPairings = () => {
  return (
    <BestPairingsContainer>
      <MainBooksTitle title="요즘 뜨는 페어링" />
      <PairingsContainer>
        <BestPairing pairingTitle={'페어링 이름1'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름2'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름3'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름4'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름5'} pairingId={1} />
      </PairingsContainer>
      <PairingsContainer>
        <BestPairing pairingTitle={'페어링 이름6'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름7'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름8'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름9'} pairingId={1} />
        <BestPairing pairingTitle={'페어링 이름10'} pairingId={1} />
      </PairingsContainer>
    </BestPairingsContainer>
  );
};

export default BestPairings;
