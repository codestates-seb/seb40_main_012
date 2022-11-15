import PageContainer from '../components/PageContainer';
import { Counter } from '../components/Counter/Counter';
import Box from '@mui/material/Box';

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
      </Box>
    </PageContainer>
  );
};

export default ReduxPage;
