import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import PageContainer from '../../components/PageContainer';
import theme from '../../styles/theme';

import {
  signUpAsync,
  selectValidCheckArray,
  setIsValid,
} from '../../store/modules/signUpSlice';
import SignUpTextFields from './SignUpTextFields';

const SignInLink = styled(Link)`
  font-size: 1rem;
`;

const AvatarStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.purple_2};
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);

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
            <AvatarStyled sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </AvatarStyled>
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
                <SignUpTextFields />
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
                  <SignInLink href="/user/signin" variant="body2">
                    로그인
                  </SignInLink>
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
