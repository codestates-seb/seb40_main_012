import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { BasicButton } from '../../../components/Buttons';
import PageContainer from '../../../components/PageContainer';
import WithDrawal from './WithDrawalModal';
import FavoriteGenre from './FavoriteGenre';
import AgeGroup from './AgeGroup';

const TitleTextStyled = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  margin-top: 30px;
`;

const NickNameInputStyled = styled.input`
  border-bottom: solid 1px white;
  appearance: none;
  height: 20px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #cfc3ff;
  :focus {
    border-color: #a28bff;
  }
  width: 90%;
`;

const ItemTextStyled = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  min-width: 60px;

  a {
    text-decoration: none !important;
    color: inherit !important;
    :hover {
      color: #6741ff !important;
    }
  }
`;

const GenderTextStyled = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 300;
`;

const GenderContainerStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  input {
    accent-color: #5729e9;
    margin-left: 0px;
  }
  .gender-flex-box {
    display: flex;
    margin-right: 15px;
    margin-left: 0px;
  }
`;

const WithDrawalBoxStyled = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 300;
  margin-top: 50px;

  color: #737373;
`;

const BtnStyled = styled(BasicButton)`
  margin-left: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const EditProfile = () => {
  // 닉네임은 따로
  // 소개글, 성별, 연령대, 선호 장르
  const [state, setState] = useState({
    introduction: '',
    gender: '',
    age: '',
    category: [],
  });

  // 입력 값에 따라 상태 변경으로 저장
  const handleChangeState = (e) => {
    return setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(state);

  return (
    <PageContainer header footer>
      <Container maxWidth="md">
        <Container component="main" maxWidth="sm">
          <Grid item xs={12} align="center" justifyContent="center">
            <Avatar
              sx={{
                mt: 3,
                bgcolor: '#A28BFF',
                width: 80,
                height: 80,
              }}
            >
              <img
                src="https://styles.redditmedia.com/t5_33mhbo/styles/profileIcon_7f1481qm5y291.jpeg?width=256&height=256&frame=1&crop=256:256,smart&s=6cc29126b9f6853db131a0f5189c8e86eff9a20e"
                alt="cat profile"
              ></img>
            </Avatar>
          </Grid>
          <TitleTextStyled>기본 정보</TitleTextStyled>
          <Grid
            container
            xs={12}
            align="left"
            alignItems="center"
            justifyContent="left"
          >
            <Grid item xs={4} align="left" justifyContent="left">
              <ItemTextStyled>닉네임</ItemTextStyled>
            </Grid>
            <Grid item xs={4.5} align="left" justifyContent="left">
              <NickNameInputStyled className="nickname-border"></NickNameInputStyled>
            </Grid>
            <Grid item xs={3.5} align="left" justifyContent="left">
              <BtnStyled width="65px" height="30px" fontSize="12px">
                중복 확인
              </BtnStyled>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            align="left"
            alignItems="center"
            justifyContent="left"
          >
            <Grid item xs={4} align="left" justifyContent="left">
              <ItemTextStyled>한 줄 소개</ItemTextStyled>
            </Grid>
            <Grid item xs={4.5} align="left" justifyContent="left">
              <NickNameInputStyled
                className="nickname-border"
                onChange={handleChangeState}
              ></NickNameInputStyled>
            </Grid>
          </Grid>
          <ItemTextStyled>
            <Link to="/mypage/profile/password" variant="body2">
              비밀번호 변경
            </Link>
          </ItemTextStyled>
          <TitleTextStyled>상세 정보</TitleTextStyled>
          <Grid
            container
            xs={12}
            align="left"
            justifyContent="left"
            alignItems="center"
          >
            <Grid item xs={4} align="left" justifyContent="left">
              <ItemTextStyled>성별</ItemTextStyled>
            </Grid>
            <Grid
              item
              align="left"
              justifyContent="left"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <GenderContainerStyled>
                <div className="gender-flex-box">
                  <input type="radio" name="gender"></input>
                  <GenderTextStyled>여성</GenderTextStyled>
                </div>
                <div className="gender-flex-box">
                  <input type="radio" name="gender"></input>
                  <GenderTextStyled>남성</GenderTextStyled>
                </div>
                <div className="gender-flex-box">
                  <input type="radio" name="gender"></input>
                  <GenderTextStyled>둘 다 아님</GenderTextStyled>
                </div>
                <div className="gender-flex-box">
                  <input type="radio" name="gender"></input>
                  <GenderTextStyled>공개 안 함</GenderTextStyled>
                </div>
              </GenderContainerStyled>
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            display="flex"
            align="left"
            alignItems="center"
            justifyContent="left"
          >
            <Grid item xs={4} align="left" justifyContent="left">
              <ItemTextStyled>연령대</ItemTextStyled>
            </Grid>
            <AgeGroup />
          </Grid>
          <ItemTextStyled>
            <Grid
              container
              xs={12}
              display="flex"
              align="left"
              alignItems="center"
              justifyContent="left"
            >
              <Grid item xs={4} align="left" justifyContent="left">
                <ItemTextStyled>선호 장르</ItemTextStyled>
              </Grid>

              <FavoriteGenre />
            </Grid>
          </ItemTextStyled>
          <WithDrawal>
            <WithDrawalBoxStyled>회원 탈퇴</WithDrawalBoxStyled>
          </WithDrawal>
          <div
            style={{
              display: 'flex',
              align: 'center',
              justifyContent: 'center',
              marginBottom: '4rem',
            }}
          >
            <BtnStyled width="65px" height="30px" fontSize="12px">
              저장하기
            </BtnStyled>
          </div>
        </Container>
      </Container>
    </PageContainer>
  );
};
export default EditProfile;
