import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageContainer from '../../components/PageContainer';

import {
  selectValidCheckArray,
  setIsValid,
} from '../../store/modules/signInSlice';
import { signInAsync } from '../../store/modules/authSlice';
import SignInTextFields from './SignInTextFields';

const theme = createTheme();

const LoginErrorMsg = styled.div`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-bottom: 16px;
`;

const SignUpLink = styled(Link)`
  font-size: 1rem;
`;

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);

  const [showLoginError, setShowLoginError] = useState(false);

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
      .then((response) => {
        if (!response.payload?.errorMessage) {
          navigate('/', { replace: true });
        } else {
          setShowLoginError((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100vh - 60px - 200px)', // header, footer
              minHeight: '410px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              {showLoginError ? (
                <LoginErrorMsg>
                  아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
                  입력하신 내용을 다시 확인해주세요.
                </LoginErrorMsg>
              ) : null}
              <Grid container justifyContent="flex-end">
                {/* <Grid container> */}
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  계정이 없으신가요?{' '}
                  <SignUpLink href="/user/signup" variant="body2">
                    회원가입
                  </SignUpLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </PageContainer>
  );
};
export default SignInPage;
