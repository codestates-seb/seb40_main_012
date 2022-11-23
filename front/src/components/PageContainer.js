import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import Header from './Header';
import Footer from './Footer';

const PageContainer = ({ children, header, footer }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {header === false ? null : <Header />}
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
          {children}
        </Container>
        {footer ? <Footer /> : null}
      </Box>
    </ThemeProvider>
  );
};

export default PageContainer;
