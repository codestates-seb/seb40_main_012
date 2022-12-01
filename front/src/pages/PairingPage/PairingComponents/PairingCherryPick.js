import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background-image: url('https://main-012-images.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A9%E1%84%80%E1%85%A9%E1%86%BC%E1%84%82%E1%85%A7%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B5%E1%84%91%E1%85%B5%E1%86%A8%E1%84%80%E1%85%A1%E1%84%8B%E1%85%A1%E1%86%AB1%E1%84%8E%E1%85%A1.JPG');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    color: beige;
    font-weight: bold;
    font-size: 22px;
    padding: 20px;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.3);
  }
  div {
    padding: 20px;
    text-align: end;
    color: beige;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.3);
    font-weight: bold;
  }
`;

const PairingCherryPick = () => {
  return (
    <Wrapper>
      <h1>이번 주 Cherry Pick</h1>
      <div>
        세상을 홀로 견디는 기분.
        <br />
        우주도, 지구도, 서울도 똑같은 마음으로 여행중인 당신을 위해.
      </div>
    </Wrapper>
  );
};

export default PairingCherryPick;
