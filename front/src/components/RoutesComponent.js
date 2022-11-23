import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFirstLogin, selectIsLogin } from '../store/modules/authSlice';

import MainPage from '../pages/MainPage/MainPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import FirstLoginPage from '../pages/FirstLoginPage/FirstLoginPage';

import BookDetail from '../pages/BookDetailPage/BookDetail';

import PairingPage from '../pages/PairingPage/PairingAll';
import PairingFilm from '../pages/PairingPage/PairingFilm';
import PairingCuisine from '../pages/PairingPage/PairingCuisine';
import PairingMusic from '../pages/PairingPage/PairingMusic';
import PairingBook from '../pages/PairingPage/PairingBook';
import PairingEtc from '../pages/PairingPage/PairingEtc';
import PairingWrite from '../pages/PairingPage/PairingWrite/PairingWrite';
import PairingDetail from '../pages/PairingPage/PairingDetail/PairingDetail';

import CollectionPage from '../pages/CollectionPage/Collection';
import CollectionDetailPage from '../pages/CollectionDetailPage/CollectionDetail';
import CollectionWritePage from '../pages/CollectionWritePage/CollectionWrite';

import MyComment from '../pages/MyPage/MyComment/MyComment';
import MyParing from '../pages/MyPage/MyPairing/MyPairing';
import MyPick from '../pages/MyPage/MyPick/MyPick';
import EditProfile from '../pages/MyPage/EditProfile/EditProfile';
import ChangePassWd from '../pages/MyPage/EditProfile/ChangePassWd';
import MyCollection from '../pages/MyPage/MyCollection/MyCollection';

import NoMatch from '../pages/NoMatch';

//임시 페이지!
import ReduxPage from '../pages/TestPage/Temp_Redux';
import ButtonTest from '../pages/TestPage/ButtonTest';

const RoutesComponent = () => {
  const isLogin = useSelector(selectIsLogin);
  const firstLogin = useSelector(selectFirstLogin);

  /**
   * option
   * null    =>  아무나 출입이 가능한 페이지
   * true    =>  로그인한 유저만 출입이 가능한 페이지
   * false   =>  로그인한 유저는 출입 불가능한 페이지
   */
  const getElement = (Component, option = null) => {
    if (option === null && firstLogin) return getFirstLoginElement();
    if (option === null) return <Component />;

    if ((isLogin && !option) || (!isLogin && option))
      return <Navigate to="/" replace={true}></Navigate>;

    if (firstLogin) return getFirstLoginElement();
    return <Component />;
  };

  const getFirstLoginElement = () => {
    return <FirstLoginPage />;
  };

  return (
    <Routes>
      <Route path="/" element={getElement(MainPage, null)} />
      <Route path="/user/signin" element={getElement(SignInPage, false)} />
      <Route path="/user/signup" element={getElement(SignUpPage, false)} />
      <Route path="/book/:isbn" element={getElement(BookDetail, null)} />
      <Route path="/pairing" element={getElement(PairingPage, null)} />
      <Route path="/pairing/film" element={getElement(PairingFilm, null)} />
      <Route
        path="/pairing/cuisine"
        element={getElement(PairingCuisine, null)}
      />
      <Route path="/pairing/music" element={getElement(PairingMusic, null)} />
      <Route path="/pairing/book" element={getElement(PairingBook, null)} />
      <Route path="/pairing/etc" element={getElement(PairingEtc, null)} />
      <Route path="/pairing/write" element={getElement(PairingWrite, null)} />
      <Route
        path="/pairing/:pairingId"
        element={getElement(PairingDetail, null)}
      />
      <Route path="/collection" element={getElement(CollectionPage, null)} />
      <Route
        path="/collection/:collectionid"
        element={getElement(CollectionDetailPage, null)}
      />
      <Route
        path="/collection/write"
        element={getElement(CollectionWritePage, null)}
      />
      <Route path="/mypage" element={getElement(MyComment, null)} />
      <Route path="/mypage/mycomment" element={getElement(MyComment, null)} />
      <Route path="/mypage/mypairing" element={getElement(MyParing, null)} />
      <Route
        path="/mypage/mycollection"
        element={getElement(MyCollection, null)}
      />
      <Route path="/mypage/mypick" element={getElement(MyPick, null)} />
      <Route path="/mypage/profile" element={getElement(EditProfile, null)} />
      <Route
        path="/mypage/profile/changepasswd"
        element={getElement(ChangePassWd, null)}
      />
      <Route path="/redux" element={<ReduxPage />} />
      <Route path="/button-test" element={<ButtonTest />} />
      <Route path="*" element={getElement(NoMatch, null)} />
    </Routes>
  );
};

export default RoutesComponent;
