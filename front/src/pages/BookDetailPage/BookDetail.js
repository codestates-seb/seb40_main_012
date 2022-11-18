import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import PairingOriginBook from '../PairingPage/PairingDetail/PairingOriginBook';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BookDetail = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer footer>
        <Wrapper>
          <h1> 책 상세 페이지</h1>
          <PairingOriginBook disabled={true} />
        </Wrapper>
      </PageContainer>
    </ThemeProvider>
  );
};

export default BookDetail;
