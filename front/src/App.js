import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles';
import { ScrollToTop, Loading, Snackbar } from 'components';

const RoutesComponent = lazy(() => import('components/RoutesComponent'));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <Snackbar />
        <RoutesComponent />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
