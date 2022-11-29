import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid pink;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.purple_2};
`;

const PairingCherryPick = () => {
  return <Wrapper></Wrapper>;
};

export default PairingCherryPick;
