import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PageContainer from '../../../components/PageContainer';
import { ContainedButton } from '../../../components/Buttons';

import {
  signUpAsync,
  selectValidCheckArray,
  setIsValid,
  setInputValue,
} from '../../../store/modules/signUpSlice';
import ValidationTextFields from '../../../components/ValidationTextFields';

const inputInfo = [
  {
    label: '현재 비밀번호',
    id: 'password',
    autoComplete: 'password',
    type: 'password',
  },
  {
    label: '새 비밀번호',
    id: 'newPassword',
    autoComplete: 'new-password',
    type: 'password',
  },
  {
    label: '비밀번호 확인',
    id: 'newPasswordCheck',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const AvatarStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.purple_2};
`;

const ChangePassWd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);
  const selectSignUP = useSelector((state) => state.signUp, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignUP;

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChangeInput = useCallback((id, value) => {
    dispatch(setInputValue({ id, value }));
  });

  const handleBlur = useCallback((id, value, required) => {
    dispatch(setIsValid(id, value, required));
  });

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
    <PageContainer footer center maxWidth="xs">
      <AvatarStyled sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </AvatarStyled>
      <Typography component="h1" variant="h5">
        비밀번호 변경
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                submit={inputInfo.length - 1 === i ? true : false}
              />
            </Grid>
          ))}
        </Grid>
        <ContainedButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
          변경하기
        </ContainedButton>
      </Box>
    </PageContainer>
  );
};
export default ChangePassWd;
