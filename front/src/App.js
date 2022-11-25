import { Suspense, lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles';
import { logoutApi, refreshTokenApi } from 'api/authApi';
import { selectIsLogin } from 'store/modules/authSlice';
import { ScrollToTop } from 'components';

const RoutesComponent = lazy(() => import('components/RoutesComponent'));

const App = () => {
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) getToken();
  }, []);

  const getToken = async () => {
    try {
      await refreshTokenApi();
    } catch (e) {
      console.log(e);
      // 에러코드 나오면 처리 필요
      logoutApi();
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyle />
      <Suspense
        fallback={
          <img
            src={'/images/cherrypick_loading.gif'}
            alt="loading cherrypick"
          ></img>
        }
      >
        <RoutesComponent />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
