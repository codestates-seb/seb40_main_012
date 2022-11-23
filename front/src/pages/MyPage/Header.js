import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonCSS = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
  width: 100px;
  color: #737373;
  a {
    text-decoration: none !important;
    color: #737373;
  }
`;

const Header = () => {
  return (
    <>
      {/* xs , sm, md, lg, xl 사이즈 */}

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Grid container>
            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
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
            <Grid item xs={7.2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  mt: 3,
                  mb: 2,
                }}
                style={{
                  marginLeft: 20,
                }}
              >
                <Typography variant="h6">chichi</Typography>

                <Typography variant="body1" gutterBottom>
                  책의 온기 37.5도
                </Typography>
                <Typography sx={{ mt: 1.6 }} variant="body2" gutterBottom>
                  팔로잉 2 팔로워 3
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2.4}>
              <ButtonCSS>
                <Grid item>
                  <Link to="/mypage/profile" variant="body2">
                    <Typography
                      sx={{ mt: 4 }}
                      variant="body2"
                      gutterBottom
                      style={{
                        fontSize: '0.875rem;',
                      }}
                    >
                      내 정보 수정
                    </Typography>
                  </Link>
                </Grid>
              </ButtonCSS>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Header;
