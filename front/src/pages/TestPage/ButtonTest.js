import { ThemeProvider } from 'styled-components';
import Box from '@mui/material/Box';
import theme from '../../styles/theme';
import PageContainer from '../../components/PageContainer';
import {
  ContainedButton,
  TextButton,
  OutlinedButton,
} from '../../components/Buttons';

const ButtonTest = () => {
  return (
    <PageContainer footer>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 60px - 200px)', // header, footer
          minHeight: '410px',
        }}
      >
        <ThemeProvider theme={theme}>
          <ContainedButton type="submit">로그인</ContainedButton>
          <ContainedButton type="submit" disabled>
            로그인
          </ContainedButton>
          <TextButton type="submit">로그인</TextButton>
          <TextButton type="submit" disabled>
            로그인
          </TextButton>
          <OutlinedButton type="submit">로그인</OutlinedButton>
          <OutlinedButton type="submit" disabled>
            로그인
          </OutlinedButton>
        </ThemeProvider>
      </Box>
    </PageContainer>
  );
};

export default ButtonTest;
