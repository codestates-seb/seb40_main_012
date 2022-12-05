import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFirstLogin, selectIsLogin } from 'store/modules/authSlice';

import {
  MainPage,
  SignUpPage,
  SignInPage,
  FirstLoginPage,
  BookDetail,
  PairingPage,
  PairingFilm,
  PairingCuisine,
  PairingMusic,
  PairingBook,
  PairingEtc,
  PairingWrite,
  PairingDetail,
  CollectionPage,
  CollectionDetailPage,
  CollectionWritePage,
  MyComment,
  MyParing,
  MyPick,
  EditProfile,
  ChangePassWd,
  MyCollection,
  NoMatch,
  SearchBookPage,
  CollectionEditPage,
  SearchCollectionPage,
  SearchPairingPage,
} from 'pages';

//임시 페이지!
import ReduxPage from 'pages/TestPage/Temp_Redux';
import ButtonTest from 'pages/TestPage/ButtonTest';
import ImgTest from 'pages/TestPage/ImgTest';

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
      <Route path="/pairing/write" element={getElement(PairingWrite, true)} />
      <Route
        path="/pairing/:pairingId"
        element={getElement(PairingDetail, null)}
      />
      <Route path="/collection" element={getElement(CollectionPage, null)} />
      <Route
        path="/collection/:collectionId"
        element={getElement(CollectionDetailPage, null)}
      />
      <Route
        path="/collection/write"
        element={getElement(CollectionWritePage, true)}
      />
      <Route
        path="/collection/edit/:collectionId"
        element={getElement(CollectionEditPage, true)}
      />
      <Route path="/mypage" element={getElement(MyComment, true)} />
      <Route path="/mypage/mycomment" element={getElement(MyComment, true)} />
      <Route path="/mypage/mypairing" element={getElement(MyParing, true)} />
      <Route
        path="/mypage/mycollection"
        element={getElement(MyCollection, true)}
      />
      <Route path="/mypage/mypick" element={getElement(MyPick, true)} />
      <Route path="/mypage/profile" element={getElement(EditProfile, true)} />
      <Route
        path="/mypage/profile/password"
        element={getElement(ChangePassWd, true)}
      />
      <Route path="/search/book" element={getElement(SearchBookPage, null)} />
      <Route
        path="/search/book/:keyword"
        element={getElement(SearchBookPage, null)}
      />
      <Route
        path="/search/collection"
        element={getElement(SearchCollectionPage, null)}
      />
      <Route
        path="/search/collection/:keyword"
        element={getElement(SearchCollectionPage, null)}
      />
      <Route
        path="/search/pairing"
        element={getElement(SearchPairingPage, null)}
      />
      <Route
        path="/search/pairing/:keyword"
        element={getElement(SearchPairingPage, null)}
      />
      <Route path="/redux" element={<ReduxPage />} />
      <Route path="/button-test" element={<ButtonTest />} />
      <Route path="/img-test" element={<ImgTest />} />
      <Route path="*" element={getElement(NoMatch, null)} />
    </Routes>
  );
};

export default RoutesComponent;
