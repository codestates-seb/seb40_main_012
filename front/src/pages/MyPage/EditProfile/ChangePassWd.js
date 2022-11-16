import Grid from '@mui/material/Grid';
import { BasicButton } from '../../../components/Buttons';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import PageContainer from '../../../components/PageContainer';

const TitleText = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  margin-top: 30px;
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

const ChangePassWd = () => {
  return (
    <>
      {/* xs , sm, md, lg, xl 사이즈 */}
      <PageContainer header footer>
        <Container component="main" maxWidth="sm" sx={{ mt: 10, mb: 15 }}>
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
            <Btn>비밀번호 변경</Btn>
            <ForgotPassWd>비밀번호를 잊으셨나요?</ForgotPassWd>
          </Grid>
        </Container>
      </PageContainer>
    </>
  );
};

export default ChangePassWd;
