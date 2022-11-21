import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import { selectIsLogin } from '../store/modules/authSlice';

const PageContainer = ({ children, header, footer, option = null }) => {
  const isLoin = useSelector(selectIsLogin);
  const navigate = useNavigate();
  /**
   * option
   * null    =>  아무나 출입이 가능한 페이지
   * true    =>  로그인한 유저만 출입이 가능한 페이지
   * false   =>  로그인한 유저는 출입 불가능한 페이지
   */

  useEffect(() => {
    if (option === null) return;
    if (isLoin) {
      // 로그인 한 상태
      if (!option) navigate('/');
    } else {
      // 로그인 하지 않은 상태
      if (option) navigate('/user/signin');
    }
  }, [navigate]);

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
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
      {footer ? <Footer /> : null}
    </Box>
  );
};

export default PageContainer;
