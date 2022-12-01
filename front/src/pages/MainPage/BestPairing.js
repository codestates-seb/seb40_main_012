import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const randomColor = () => {
  //130 ~ 200
  return Math.floor(Math.random() * 70) + 130;
};

const BestPairingContainer = styled.div`
  display: flex;
  width: 18%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  @media screen and (max-width: 800px) {
    width: 30%;
    margin: 3px;
  }
  @media screen and (max-width: 500px) {
    width: 45%;
    margin: 5px;
  }
`;

const PairingTitle = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  word-wrap: break-word;
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
  const randomRGB = `rgb(${randomColor()}, ${randomColor()}, 255)`;

  const navigate = useNavigate();

  const onClickPairing = () => {
    navigate(`/pairing/${pairingId}`);
  };

  return (
    <BestPairingContainer
      img={pairingImg}
      color={pairingImg ? null : randomRGB}
      onClick={onClickPairing}
    >
      <PairingTitle>{pairingTitle}</PairingTitle>
    </BestPairingContainer>
  );
};

export default BestPairing;
