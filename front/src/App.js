import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

import NoMatch from './pages/NoMatch';
import PairingPage from './pages/PairingPage/PairingAll';
import PairingMovie from './pages/PairingPage/PairingFilm';
import PairingFood from './pages/PairingPage/PairingCuisine';
import PairingMusic from './pages/PairingPage/PairingMusic';
import PairingBook from './pages/PairingPage/PairingBook';
import PairingEtc from './pages/PairingPage/PairingEtc';
import PairingWrite from './pages/PairingPage/PairingWrite/PairingWrite';
import PairingDetail from './pages/PairingPage/PairingDetail/PairingDetail';
import CollectionPage from './pages/CollectionPage/Collection';
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetail';

//임시 페이지!
import ReduxPage from './pages/Temp_Redux';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/redux" element={<ReduxPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/pairing" element={<PairingPage />} />
        <Route path="/pairing/film" element={<PairingMovie />} />
        <Route path="/pairing/cuisine" element={<PairingFood />} />
        <Route path="/pairing/music" element={<PairingMusic />} />
        <Route path="/pairing/book" element={<PairingBook />} />
        <Route path="/pairing/etc" element={<PairingEtc />} />
        <Route path="/pairing/write" element={<PairingWrite />} />
        <Route path="/pairing/:pairingId" element={<PairingDetail />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/user/signin" element={<SignInPage />} />
        <Route path="/user/signup" element={<SignUpPage />} />
        <Route
          path="/collection/:collectionid"
          element={<CollectionDetailPage />}
        ></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
