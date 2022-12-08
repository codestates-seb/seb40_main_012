import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { oauthAsync } from 'store/modules/authSlice';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';
import PageContainer from 'containers/PageContainer';
import Loading from 'components/Loading';

const OauthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    const code = location.search;
    getOauthCode(path, code);
  }, []);

  const getOauthCode = (path, code) => {
    dispatch(oauthAsync({ path, code }))
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
        console.log(err);
        dispatch(
          setOpenSnackbar({
            severity: 'error',
            message: `${err.message}로 인해 로그인 실패하였습니다`,
          })
        );
        navigate('/', { replace: true });
      });
  };
  return (
    <PageContainer>
      <Loading />
    </PageContainer>
  );
};

export default OauthPage;
