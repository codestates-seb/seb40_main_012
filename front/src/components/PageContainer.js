import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import Header from './Header';
import Footer from './Footer';

const PageContainer = ({
  children,
  header,
  footer,
  center,
  maxWidth = 'lg',
  cmt = 8,
  cmb = 8,
  bmt = 8,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        {header === false ? null : <Header />}
        <Container
          component="main"
          sx={{ mt: cmt, mb: cmb }}
          maxWidth={maxWidth}
        >
          {center ? (
            <Box
              sx={{
                marginTop: bmt,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </Box>
          ) : (
            children
          )}
        </Container>
        <Box
          component="footer"
          sx={{
            mt: 'auto',
          }}
        >
          {footer ? <Footer /> : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageContainer;
