import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { PageContainer } from 'containers';
import { ContainedButton } from 'components';
import {
  selectValidCheckArray,
  setIsValid,
  setInitLoginInput,
} from 'store/modules/signInSlice';
import { signInAsync } from 'store/modules/authSlice';
import SignInTextFields from './SignInTextFields';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';

const LoginErrorMsgStyled = styled.div`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-bottom: 16px;
`;

const SignUpLinkStyled = styled(Link)`
  font-size: 1rem;
`;

const AvatarStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.purple_2};
`;

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);
  const loading = useSelector((state) => state.auth.loading);

  const [showLoginError, setShowLoginError] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    setBackdropOpen(loading);
  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validCheckArray.length > 0) {
      for (const key of validCheckArray) {
        dispatch(setIsValid(key, data.get(key), true));
      }
      return;
    }

    const params = {
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(signInAsync(params))
      .unwrap()
      .then(() => {
        dispatch(
          setOpenSnackbar({
            severity: 'success',
            message: '로그인이 완료되었습니다.',
          })
        );
        dispatch(setInitLoginInput());

        navigate('/', { replace: true });
      })
      .catch(() => {
        setShowLoginError(true);
      });
  };

  const handleKakaoOauth = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.REACT_APP_KAKAO_CLIENTID
    }&redirect_uri=${'http://localhost:3000/oauth/kakao'}&response_type=code&prompt=login`;
    window.location.replace(KAKAO_AUTH_URL);
  };

  const handleGoogleOauth = () => {
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=${
      process.env.REACT_APP_GOOGLE_CLIENTID
    }&scope=email%20profile&state=Xm-I8A9bXAsM-ZWgygWBbjfNIsLs-Z_80iyaZ83VIfA%3D&redirect_uri=${'http://localhost:3000/oauth/google'}`;
    window.location.replace(GOOGLE_AUTH_URL);
  };

  return (
    <PageContainer footer center maxWidth="xs" backdrop={backdropOpen}>
      <AvatarStyled sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </AvatarStyled>
      <Typography component="h1" variant="h5">
        로그인
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <SignInTextFields />
        </Grid>
        {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="이메일 저장"
              /> */}
        {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="로그인 상태 유지"
              /> */}
        <ContainedButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
          로그인
        </ContainedButton>
        {showLoginError ? (
          <LoginErrorMsgStyled>
            아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
            입력하신 내용을 다시 확인해주세요.
          </LoginErrorMsgStyled>
        ) : null}
        <Grid container justifyContent="flex-end">
          {/* <Grid container> */}
          {/* <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
          <Grid item>
            계정이 없으신가요?{' '}
            <SignUpLinkStyled to="/user/signup" variant="body2">
              회원가입
            </SignUpLinkStyled>
          </Grid>
        </Grid>
      </Box>
      <button onClick={handleKakaoOauth}>카카오톡 로그인</button>
      <button onClick={handleGoogleOauth}>google 로그인</button>
    </PageContainer>
  );
};
export default SignInPage;
