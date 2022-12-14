import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'styles/theme';
import { Header, Footer } from 'containers';
import { Backdrop } from 'components';
import ScrollTopBtn from 'components/ScrollTopBtn';

const PageContainer = ({
  children,
  header,
  footer,
  center,
  maxWidth = 'lg',
  cmt = 8,
  cmb = 8,
  bmt = 8,
  backdrop = false,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ScrollTopBtn />
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
          <Backdrop open={backdrop} />
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
