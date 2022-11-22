import Grid from '@mui/material/Grid';
import { BasicButton } from '../../../components/Buttons';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import PageContainer from '../../../components/PageContainer';
import {
  signUpAsync,
  selectValidCheckArray,
  setIsValid,
  setInputValue,
} from '../../../store/modules/signUpSlice';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ValidationTextFields from '../../../components/ValidationTextFields';
import { useCallback, useEffect, useRef, useState } from 'react';

const TitleText = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  margin-top: 30px;
`;

const LoginErrorMsg = styled.div`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-bottom: 16px;
`;
const PassWdInput = styled.input`
  border-bottom: solid 1px white;
  appearance: none;
  height: 20px;
  outline: 0;
  font-size: 16px;
  border-width: 0 0 2px;
  border-color: #cfc3ff;
  margin-top: 18px;
  :focus {
    border-color: #a28bff;
  }
  width: 100%;
`;
// const ItemText = styled.div`
//   width: 100%;
//   font-size: 15px;
//   font-weight: 300;
//   margin-top: 10px;
//   a {
//     text-decoration: none !important;
//     color: inherit !important;
//   }
// `;

const ForgotPassWd = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 300;
  color: #737373;
  margin-top: 10px;
  :hover {
    color: #6741ff !important;
    cursor: pointer;
  }
`;

const Btn = styled(BasicButton)`
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  &:hover {
    cursor: pointer;
  }
`;
const inputInfo = [
  {
    label: '현재 비밀번호',
    id: 'currentPassword',
    autoComplete: 'password',
    type: 'password',
  },
  {
    label: '새 비밀번호',
    id: 'password',
    autoComplete: 'new-password',
    type: 'password',
  },
  {
    label: '비밀번호 확인',
    id: 'passwordCheck',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const ChangePassWd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef([]);
  const selectSignUp = useSelector((state) => state.signUp, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignUp;
  const validCheckArray = useSelector(selectValidCheckArray, shallowEqual);
  const [showLoginError, setShowLoginError] = useState(false);

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
      // nickName: data.get('nickName'),
      // email: data.get('email'),
      currentPassword: data.get('currentPassword'),
      password: data.get('password'),
    };

    dispatch(signUpAsync(params))
      .then((response) => {
        if (response.payload?.data) {
          navigate('/settings/profile', { replace: true });
        } else {
          console.log(response.payload?.errorMessage);
          setShowLoginError((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* xs , sm, md, lg, xl 사이즈 */}
      <PageContainer header footer>
        <Container component="main" maxWidth="sm" sx={{ mt: 10, mb: 15 }}>
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
                    submit={inputInfo.length - 1 === i ? true : false}
                  />
                </Grid>
              ))}
            </Grid>
            {showLoginError ? (
              <LoginErrorMsg>
                현재 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시
                확인해주세요.
              </LoginErrorMsg>
            ) : null}

            <TitleText>현재 비밀번호</TitleText>
            <Grid
              container
              xs={12}
              align="left"
              alignItems="center"
              justifyContent="left"
            >
              <Grid item align="left" xs={12} justifyContent="left">
                <PassWdInput className="nickname-border"></PassWdInput>
              </Grid>
            </Grid>

            <TitleText>새 비밀번호</TitleText>
            <Grid
              container
              xs={12}
              align="left"
              alignItems="center"
              justifyContent="left"
            >
              <Grid item align="left" xs={12} justifyContent="left">
                <PassWdInput className="nickname-border"></PassWdInput>
              </Grid>
            </Grid>

            <TitleText>비밀번호 확인</TitleText>
            <Grid
              container
              xs={12}
              align="left"
              alignItems="center"
              justifyContent="left"
            >
              <Grid item align="left" xs={12} justifyContent="left">
                <PassWdInput className="nickname-border"></PassWdInput>
              </Grid>
            </Grid>
            <Grid
              item
              align="center"
              xs={12}
              sx={{ mt: 7 }}
              justifyContent="center"
            >
              <Btn type="submit">비밀번호 변경</Btn>
              <ForgotPassWd>비밀번호를 잊으셨나요?</ForgotPassWd>
            </Grid>
          </Box>
        </Container>
      </PageContainer>
    </>
  );
};

export default ChangePassWd;
