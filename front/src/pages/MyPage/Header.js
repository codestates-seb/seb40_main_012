import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'api/axios';
import { useEffect, useState } from 'react';
import { USER_INFO_URL } from 'api/requests';

const Progress = styled.div`
  #progress {
    appearance: none;
    height: 9px;
  }
  #progress::-webkit-progress-bar {
    background: #f0f0f0;
    border-radius: 10px;
    box-shadow: inset 5px 5px 10px rgb(244 244 244);
  }
  #progress::-webkit-progress-value {
    border-radius: 10px;
    background: #6741ff;
    background: linear-gradient(to right, #5b32ff, #b09dff);
  }

  /* @media screen and (max-width: 100px) {
    margin-right: 100px;
  } */

  .header-move {
    @media screen and (max-width: 490px) {
      /* display: flex; */

      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      justify-content: center;
    }
  }
  .temp {
    @media screen and (max-width: 490px) {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }

  .title {
    @media screen and (max-width: 490px) {
      align-items: center;
    }
  }
  .align-header {
    @media screen and (max-width: 490px) {
      align-items: center;
      margin-top: 0;
      margin-bottom: 4px;
    }
  }
  .edit-profile {
    /* width: 100%;
    flex-direction: row-reverse;
    display: flex; */
    /* 
    @media screen and (max-width: 450px) {
      flex-direction: row-reverse;
      width: 100%;
      display: flex;
    } */

    a {
      font-size: 11px;
    }

    display: flex;
    align-items: center;
    height: 70%;
    justify-content: center;

    @media screen and (max-width: 490px) {
      display: flex;
      margin-top: -20px;
      min-width: 140px;
      align-items: center;
      justify-content: center;
    }
  }
`;
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
  const [userInfo, setUserInfo] = useState({
    introduction: '',
    gender: '',
    age: '',
    nickname: '',
    temp: '',
    category: [],
  });

  const fetchData = async () => {
    axios
      .get(USER_INFO_URL)

      .then((response) => {
        setUserInfo({
          introduction: response.data.introduction,
          gender: response.data.gender,
          age: response.data.age,
          nickname: response.data.nickname,
          temp: response.data.temp,
          category: response.data.category,
          profileImage: response.data.profileImage,
        });
      })
      .catch((error) => console.log('에러', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* xs , sm, md, lg, xl 사이즈 */}

      <Container component="main" maxWidth="xs">
        <Progress>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Grid container className="header-move">
              <Grid
                item
                xs={'auto'}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <div className="avatar">
                  <Avatar
                    sx={{
                      bgcolor: '#A28BFF',
                      width: 80,
                      height: 80,
                    }}
                    src={userInfo.profileImage ? userInfo.profileImage : ''}
                  ></Avatar>
                </div>
              </Grid>

              <Grid item xs={6.5} sx={{ padding: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 3,
                    mb: 2,
                  }}
                  className="align-header"
                >
                  <Typography
                    className="title"
                    sx={{
                      display: 'flex',
                      mt: 1,
                      fontSize: 17,
                      fontWeight: 400,
                    }}
                    color="#2e3031"
                    variant="body2"
                    gutterBottom
                    component={'span'}
                  >
                    {userInfo.nickname ? userInfo.nickname : ' '}
                  </Typography>

                  <Typography
                    color="#232627"
                    sx={{
                      fontWeight: 200,
                    }}
                    variant="body2"
                    gutterBottom
                    component={'span'}
                  >
                    {userInfo.introduction ? userInfo.introduction : null}
                  </Typography>
                  <Typography
                    sx={{ mt: 1.6, color: '#9b8adb' }}
                    variant="body2"
                    gutterBottom
                    component={'span'}
                  >
                    <progress
                      id="progress"
                      value={userInfo.temp}
                      min="0"
                      max="100"
                    ></progress>
                    <div className="temp"> 책의 온기 {userInfo.temp}도</div>
                  </Typography>
                </Box>
              </Grid>
              {/* <div className="edit-profile"> */}
              <Grid item sx={{ justifyContent: 'center' }}>
                <div className="edit-profile">
                  <ButtonCSS>
                    <Grid item>
                      <Link to="/mypage/profile" variant="body2">
                        내 정보 수정
                      </Link>
                    </Grid>
                  </ButtonCSS>
                </div>
              </Grid>
              {/* </div> */}
            </Grid>
          </Box>
        </Progress>
      </Container>
    </>
  );
};

export default Header;
