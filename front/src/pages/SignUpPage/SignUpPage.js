import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { PageContainer } from 'containers';
import { ContainedButton } from 'components';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';

import {
  signUpAsync,
  selectValidCheckArray,
  setIsValid,
} from 'store/modules/signUpSlice';
import SignUpTextFields from './SignUpTextFields';

const SignInLinkStyled = styled(Link)`
  font-size: 1rem;
`;

const AvatarStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.purple_2};
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);
  const loading = useSelector((state) => state.signUp.loading);

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
      nickName: data.get('nickName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(signUpAsync(params))
      .unwrap()
      .then(() => {
        dispatch(
          setOpenSnackbar({
            severity: 'success',
            message: '회원가입이 완료되었습니다.',
          })
        );

        navigate('/user/signin', { replace: true });
      })
      .catch((error) => {
        const { message } = error;
        dispatch(
          setOpenSnackbar({
            severity: 'error',
            message: message,
          })
        );
      });
  };

  return (
    <PageContainer footer center maxWidth="xs" backdrop={backdropOpen}>
      <AvatarStyled sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </AvatarStyled>
      <Typography component="h1" variant="h5">
        회원가입
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <SignUpTextFields />
        </Grid>
        <ContainedButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
          가입하기
        </ContainedButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            이미 가입하셨나요?{' '}
            <SignInLinkStyled to="/user/signin" variant="body2">
              로그인
            </SignInLinkStyled>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default SignUpPage;
