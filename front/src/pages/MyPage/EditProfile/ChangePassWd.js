import Grid from '@mui/material/Grid';
import { BasicButton } from '../../../components/Buttons';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import PageContainer from '../../../components/PageContainer';
import {
  selectValidCheckArray,
  setIsValid,
} from '../../../store/modules/changePassWdSlice';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ChangePassWdTextFields from './ChangePassWdTextFields';

const TitleTextStyled = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
`;

const LoginErrorMsgStyled = styled.div`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-bottom: 16px;
`;
const PassWdInputStyled = styled.input`
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

const ForgotPassWdStyled = styled.div`
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

const BtnStyled = styled(BasicButton)`
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  &:hover {
    cursor: pointer;
  }
`;

const ChangePassWd = () => {
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
      currentPassword: data.get('currentPassword'),
      password: data.get('password'),
    };

    dispatch(setIsValid(params))
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
            {showLoginError ? (
              <LoginErrorMsgStyled>
                현재 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시
                확인해주세요.
              </LoginErrorMsgStyled>
            ) : null}

            <ChangePassWdTextFields />
            <TitleTextStyled>비밀번호 확인</TitleTextStyled>
            <Grid item align="left" xs={12} justifyContent="left">
              <PassWdInputStyled className="nickname-border"></PassWdInputStyled>
            </Grid>

            <Grid
              item
              align="center"
              xs={12}
              sx={{ mt: 7 }}
              justifyContent="center"
            >
              <BtnStyled type="submit">비밀번호 변경</BtnStyled>
              <ForgotPassWdStyled>비밀번호를 잊으셨나요?</ForgotPassWdStyled>
            </Grid>
          </Box>
        </Container>
      </PageContainer>
    </>
  );
};

export default ChangePassWd;
