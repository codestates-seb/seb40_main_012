import styled from 'styled-components';
import Box from '@mui/material/Box';
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
        <Btn>click</Btn>
        <BasicSelectTest />
      </Box>
    </PageContainer>
  );
};

export default ReduxPage;
