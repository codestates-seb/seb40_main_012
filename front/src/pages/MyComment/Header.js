import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';

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
              ></Avatar>
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
              <Button
                type="submit"
                fullWidth
                variant="text"
                sx={{ mt: 3, mb: 2, width: 100, color: 'grey' }}
                size="small"
              >
                <Typography
                  color=""
                  sx={{ mt: 1.6 }}
                  variant="body2"
                  gutterBottom
                >
                  내 정보 수정
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Header;
