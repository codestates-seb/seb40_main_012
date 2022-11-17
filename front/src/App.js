import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyComment from './pages/MyPage/MyComment/MyComment';
import NoMatch from './pages/NoMatch';
import CollectionPage from './pages/CollectionPage/Collection';
import MyParing from './pages/MyPage/MyPairing/MyPairing';
import MyCollection from './pages/MyPage/MyCollection/MyCollection';
import MyPick from './pages/MyPage/MyPick/MyPick';
import EditProfile from './pages/MyPage/EditProfile/EditProfile';
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetail';
import ChangePassWd from './pages/MyPage/EditProfile/ChangePassWd';

import PairingPage from './pages/PairingPage/PairingAll';
import PairingFilm from './pages/PairingPage/PairingFilm';
import PairingCuisine from './pages/PairingPage/PairingCuisine';
import PairingMusic from './pages/PairingPage/PairingMusic';
import PairingBook from './pages/PairingPage/PairingBook';
import PairingEtc from './pages/PairingPage/PairingEtc';
import PairingWrite from './pages/PairingPage/PairingWrite/PairingWrite';
import PairingDetail from './pages/PairingPage/PairingDetail/PairingDetail';
//임시 페이지!
import ReduxPage from './pages/TestPage/Temp_Redux';
import ButtonTest from './pages/TestPage/ButtonTest';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pairing" element={<PairingPage />} />
        <Route path="/pairing/film" element={<PairingFilm />} />
        <Route path="/pairing/cuisine" element={<PairingCuisine />} />
        <Route path="/pairing/music" element={<PairingMusic />} />
        <Route path="/pairing/book" element={<PairingBook />} />
        <Route path="/pairing/etc" element={<PairingEtc />} />
        <Route path="/pairing/write" element={<PairingWrite />} />
        <Route path="/pairing/:pairingId" element={<PairingDetail />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/user/signin" element={<SignInPage />} />
        <Route path="/user/signup" element={<SignUpPage />} />
        <Route
          path="/mypage"
          element={<Navigate to="/mypage/mycomment"></Navigate>}
        />
        <Route path="/mypage/mycomment" element={<MyComment />} />
        <Route path="/mypage/mypairing" element={<MyParing />} />
        <Route path="/mypage/mycollection" element={<MyCollection />} />
        <Route path="/mypage/mypick" element={<MyPick />} />
        <Route path="/settings/profile" element={<EditProfile />} />
        <Route
          path="/settings/profile/changepasswd"
          element={<ChangePassWd />}
        />
        <Route
          path="/collection/:collectionid"
          element={<CollectionDetailPage />}
        ></Route>
        <Route path="/redux" element={<ReduxPage />} />
        <Route path="/button-test" element={<ButtonTest />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
