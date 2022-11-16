import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { BasicButton } from '../../../components/Buttons';
import styled from 'styled-components';

const TitleText = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  margin-top: 30px;
`;
const NickNameInput = styled.input`
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
const ItemText = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
`;

const WithDrawal = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 300;
  margin-top: 50px;
  color: #737373;
`;

const CollectionWriteBtn = styled(BasicButton)`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const EditProfileHeader = () => {
  return (
    <>
      {/* xs , sm, md, lg, xl 사이즈 */}

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

        <TitleText>기본 정보</TitleText>
        <Grid
          container
          xs={12}
          align="left"
          alignItems="center"
          justifyContent="left"
        >
          <Grid item xs={4} align="left" justifyContent="left">
            <ItemText>닉네임</ItemText>
          </Grid>
          <Grid item xs={4.5} align="left" justifyContent="left">
            <NickNameInput className="nickname-border"></NickNameInput>
          </Grid>
          <Grid item xs={3.5} align="left" justifyContent="left">
            <CollectionWriteBtn width="65px" height="30px" fontSize="12px">
              중복 확인
            </CollectionWriteBtn>
          </Grid>
        </Grid>
        <ItemText>비밀번호 변경</ItemText>

        <TitleText>상세 정보</TitleText>
        <Grid
          container
          xs={12}
          align="left"
          justifyContent="left"
          alignItems="center"
        >
          <Grid item xs={4} align="left" justifyContent="left">
            <ItemText>소개글</ItemText>
          </Grid>
          <Grid item xs={4.5} align="left" justifyContent="left">
            <NickNameInput className="nickname-border"></NickNameInput>
          </Grid>
          <Grid item xs={3.5} align="left" justifyContent="left">
            <CollectionWriteBtn width="65px" height="30px" fontSize="12px">
              변경하기
            </CollectionWriteBtn>
          </Grid>
        </Grid>
        <ItemText>성별</ItemText>
        <ItemText>연령대</ItemText>
        <ItemText>선호 장르</ItemText>
        <WithDrawal>회원 탈퇴</WithDrawal>
      </Container>
    </>
  );
};

export default EditProfileHeader;
