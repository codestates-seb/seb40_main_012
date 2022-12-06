import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BestPairingContainer = styled.div`
  display: flex;
  width: 20%;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 800px) {
    width: 33%;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;

const CoverContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const PairingTitle = styled.div`
  position: absolute;
  padding: 0 5px;
  width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 3px 3px 3px rgba(109, 109, 109, 0.3);
  @media screen and (max-width: 980px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const BestPairing = ({ pairingTitle, pairingImg, pairingId }) => {
  const navigate = useNavigate();

  const onClickPairing = () => {
    navigate(`/pairing/${pairingId}`);
  };

  return (
    <BestPairingContainer onClick={onClickPairing}>
      <CoverContainer img={pairingImg} color={pairingImg ? null : '#A28BFF'}>
        <PairingTitle>{pairingTitle}</PairingTitle>
      </CoverContainer>
    </BestPairingContainer>
  );
};

export default BestPairing;
