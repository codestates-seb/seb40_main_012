import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';

const PageContainer = ({ children, header, footer }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {header === false ? null : <Header />}
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
        {children}
      </Container>
      {footer ? <Footer /> : null}
    </Box>
  );
};

export default PageContainer;
