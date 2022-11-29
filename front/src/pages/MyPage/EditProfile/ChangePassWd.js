import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { PageContainer } from 'containers';
import { ContainedButton, ValidationTextFields } from 'components';
import { validationCheck } from 'util/util';
import { myPageApi } from 'api';
import { useNavigate } from 'react-router-dom';

const inputInfo = [
  {
    label: '현재 비밀번호',
    id: 'currentPassword',
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
  const navigate = useNavigate();
  const inputRef = useRef([]);

  const [inputValue, setInputValue] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [inputStatus, setInputStatus] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [inputHelperText, setInputHelperText] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChangeInput = (id, value) => {
    setInputValue({ ...inputValue, [id]: value });
  };

  const handleBlur = (id, value, required) => {
    isValid(id, value, required);
  };

  const isValid = (id, value, required) => {
    const { test, errorMessage } = validationCheck(id, value, required);
    if (!test) {
      setInputStatus({ ...inputStatus, [id]: 'error' });
      setInputHelperText({ ...inputHelperText, [id]: errorMessage });
      return;
    }

    switch (id) {
      case 'currentPassword':
        isValidCurrentPassword(id, value);
        break;
      case 'newPassword':
        isValidNewPassword(id, value);
        break;
      case 'newPasswordCheck':
        isValidNewPasswordCheck(id, value);
        break;
      default:
        break;
    }
  };

  const isValidCurrentPassword = async (id, value) => {
    try {
      const response = await myPageApi.currentPasswordCheck(value);
      if (!response) {
        setInputStatus({ ...inputStatus, [id]: 'error' });
        setInputHelperText({
          ...inputHelperText,
          [id]: '현재 비밀번호를 다시 확인해주세요.',
        });
      } else {
        setInputStatus({ ...inputStatus, [id]: '' });
        setInputHelperText({ ...inputHelperText, [id]: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isValidNewPassword = (id, value) => {
    if (inputValue.currentPassword === value) {
      setInputStatus({ ...inputStatus, [id]: 'error' });
      setInputHelperText({
        ...inputHelperText,
        [id]: '현재 비밀번호와 동일한 비밀번호로는 변경할 수 없습니다.',
      });
      return;
    }
    setInputStatus({ ...inputStatus, [id]: '' });
    setInputHelperText({ ...inputHelperText, [id]: '' });
  };

  const isValidNewPasswordCheck = (id, value) => {
    if (inputValue.newPassword !== value) {
      setInputStatus({ ...inputStatus, [id]: 'error' });
      setInputHelperText({
        ...inputHelperText,
        [id]: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }
    setInputStatus({ ...inputStatus, [id]: '' });
    setInputHelperText({ ...inputHelperText, [id]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(inputStatus).filter((v) => v === 'error').length > 0)
      return;
    // 비밀번호 변경 api
    try {
      await myPageApi.passwordUpdate(inputValue.newPasswordCheck);
      // 성공 메시지
      navigate('/mypage', { replace: true });
    } catch (error) {
      console.log(error);
    }
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
