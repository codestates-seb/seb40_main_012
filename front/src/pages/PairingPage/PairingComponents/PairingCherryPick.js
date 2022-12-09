import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    color: white;
    font-weight: bold;
    font-size: 15px;
    padding: 20px;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.3);
    @media screen and (min-width: 641px) {
      font-size: 20px;
    }
  }
  div {
    display: none;
    padding: 20px;
    text-align: end;
    color: white;
    font-size: 13px;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.3);
    font-weight: bold;
    @media screen and (min-width: 641px) {
      display: block;
    }
  }
  cursor: pointer;
`;

const PairingCherryPick = ({ img, pairingId, children }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/pairing/${pairingId}`);
  };
  return (
    <Wrapper onClick={onClick} img={img}>
      <h1>이번 주 Cherry Pick</h1>
      <div>{children}</div>
    </Wrapper>
  );
};

export default PairingCherryPick;
