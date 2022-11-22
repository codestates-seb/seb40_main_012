import Box from '@mui/material/Box';
import PageContainer from '../../components/PageContainer';

const FirstLoginPage = () => {
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
          //   minHeight: '410px',
        }}
      >
        <div>FirstLoginPage</div>
      </Box>
    </PageContainer>
  );
};

export default FirstLoginPage;
