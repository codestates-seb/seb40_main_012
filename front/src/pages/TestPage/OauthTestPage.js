import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kakaoOauthAsync } from 'store/modules/authSlice';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';

const OauthTestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    const code = location.search;
    console.log(code);
    console.log('get 요청주소', `http://localhost:8080${path}${code}`);
    getKaKao(path, code);
  }, []);

  const getKaKao = (path, code) => {
    dispatch(kakaoOauthAsync({ path, code }))
      .unwrap()
      .then(() => {
        dispatch(
          setOpenSnackbar({
            severity: 'success',
            message: '로그인이 완료되었습니다.',
          })
        );
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log('로그인실패', err);
      });
  };
  return (
    <div>
      <h1>Oauth 로그인 테스트페이지입니다</h1>
    </div>
  );
};

export default OauthTestPage;
