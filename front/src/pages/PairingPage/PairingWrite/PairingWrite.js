import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import PageContainer from '../../../components/PageContainer';

const PairingWrite = () => {
  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <h1>페어링 작성</h1>
      </ThemeProvider>
    </PageContainer>
  );
};

export default PairingWrite;
