import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageContainer from '../../components/PageContainer';
import ValidationTextFields from '../../components/ValidationTextFields';

import {
  signUpAsync,
  selectValidCheckArray,
  setIsValid,
  setInputValue,
} from '../../store/modules/signUpSlice';

const theme = createTheme();

const inputInfo = [
  {
    label: '별명',
    id: 'nickName',
    autoComplete: 'nickname',
    type: 'text',
  },
  {
    label: '이메일',
    id: 'email',
    autoComplete: 'email',
    type: 'text',
  },
  {
    label: '비밀번호',
    id: 'password',
    autoComplete: 'new-password',
    type: 'password',
  },
  {
    label: '비밀번호 재확인',
    id: 'passwordCheck',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);
  const selectSignUP = useSelector((state) => state.signUp, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignUP;
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

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
      nickName: data.get('nickName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    // console.log(params);
    dispatch(signUpAsync(params))
      .then((response) => {
        if (response.payload?.data) {
          navigate('/user/signin', { replace: true });
        } else {
          console.log(response.payload?.errorMessage);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInput = useCallback((id, value) => {
    dispatch(setInputValue({ id, value }));
  });

  const handleBlur = useCallback((id, value, required) => {
    dispatch(setIsValid(id, value, required));
  });

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
              minHeight: '500px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {inputInfo.map((v, i) => (
                  <Grid key={v.id} item xs={12}>
                    <ValidationTextFields
                      inputRef={inputRef}
                      refIndex={i}
                      label={v.label}
                      id={v.id}
                      autoComplete={v.autoComplete}
                      type={v.type}
                      required
                      fullWidth
                      setInputValue={handleChangeInput}
                      setIsValid={handleBlur}
                      inputValue={inputValue[v.id]}
                      inputStatus={inputStatus[v.id]}
                      inputHelperText={inputHelperText[v.id]}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                가입하기
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  이미 가입하셨나요?{' '}
                  <Link href="/user/signin" variant="body2">
                    로그인
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </PageContainer>
  );
};
export default SignUpPage;
