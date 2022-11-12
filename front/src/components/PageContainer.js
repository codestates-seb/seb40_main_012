import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StickyFooter from './StickyFooter';
import Header from './Header';

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
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        {children}
      </Container>
      {footer ? <StickyFooter /> : null}
    </Box>
  );
};

export default PageContainer;
