import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const randomColor = () => {
  //130 ~ 200
  return Math.floor(Math.random() * 70) + 130;
};

const BestPairingContainer = styled.div`
  display: flex;
  width: 20%;
  aspect-ratio: 1 / 1;
  background-color: ${(props) => props.bgcolor};
  box-sizing: border-box;
  margin: 7px;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const PairingTitle = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 3px 3px 3px rgba(109, 109, 109, 0.3);
  @media screen and (max-width: 980px) {
    font-size: 14px;
  }
`;

const BestPairing = ({ pairingTitle, pairingId }) => {
  const randomRGB = `rgb(${randomColor()}, ${randomColor()}, 255)`;

  const navigate = useNavigate();

  const onClickPairing = () => {
    navigate(`/pairing/${pairingId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <BestPairingContainer bgcolor={randomRGB} onClick={onClickPairing}>
        <PairingTitle>{pairingTitle}</PairingTitle>
      </BestPairingContainer>
    </ThemeProvider>
  );
};

export default BestPairing;
