import styled, { ThemeProvider } from 'styled-components';
import Box from '@mui/material/Box';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import { Counter } from '../../components/Counter/Counter';
import BasicModalTest from '../../components/TestComponent/BasicModalTest';
import BasicSelectTest from '../../components/TestComponent/BasicSelectTest';

const Btn = styled.button`
  background-color: ${({ theme }) => theme.colors.mainColor};
`;

const ReduxPage = () => {
  return (
    <PageContainer footer>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 60px - 200px)', // header, footer
          minHeight: '410px',
        }}
      >
        <Counter />
        <BasicModalTest />
        <ThemeProvider theme={theme}>
          <Btn>click</Btn>
          <BasicSelectTest />
        </ThemeProvider>
      </Box>
    </PageContainer>
  );
};

export default ReduxPage;
