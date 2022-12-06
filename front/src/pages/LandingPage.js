import { PageContainer } from 'containers';
import LandingPC from './LandingPC';
import LandingMobile from './LandingMobile';
import LandingPad from './LandingPad';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { OutlinedButton } from 'components/Buttons';

const Btn = styled(OutlinedButton)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer
      footer
      center
      // maxWidth="sm"
      bmt={5}
    >
      <div>
        <Btn
          onClick={() => {
            navigate('/home');
          }}
        >
          시작하기
        </Btn>
        <LandingPC />
        <LandingPad />
        <LandingMobile />
      </div>
    </PageContainer>
  );
};

export default LandingPage;
