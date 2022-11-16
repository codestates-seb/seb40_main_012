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

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
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
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
