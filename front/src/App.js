import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import { logout, refreshToken } from './api/authApi';
import { selectIsLogin } from './store/modules/authSlice';
import RoutesComponent from './components/RoutesComponent';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) getToken();
  }, []);

  const getToken = async () => {
    try {
      await refreshToken();
    } catch (e) {
      console.log(e);
      // 에러코드 나오면 처리 필요
      logout();
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyle />
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;
