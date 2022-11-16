import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { BasicButton } from '../../../components/Buttons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
const options = [
  '연령대',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대',
  '80대',
  '90대',
  '100대',
  '피터팬🧚‍♀️',
];

const options2 = [
  '선호 장르',
  '건강/취미',
  '경제경영',
  '고전',
  '과학',
  '대학교재/전문서적',
  '만화',
  '사회과학',
  '소설/시/희곡',
  '수험서/자격증',
  '어린이',
  '에세이',
  '여행',
  '역사',
  '요리/살림',
  '외국어',
  '유아',
  '인문학',
  '자기계발',
  '장르소설',
  '잡지',
  '종교/역학',
  '컴퓨터/모바일',
];

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
  a {
    text-decoration: none !important;
    color: inherit !important;
    :hover {
      color: #6741ff !important;
    }
  }
  input {
    display: flex;
  }
`;

const WithDrawal = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 300;
  margin-top: 50px;
  color: #737373;
`;

const Btn = styled(BasicButton)`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const EditProfileMain = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedIndex2, setSelectedIndex2] = React.useState(1);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleMenuItemClick2 = (event, index) => {
    setSelectedIndex2(index);
    setAnchorEl2(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const ITEM_HEIGHT = 24;
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
            <Btn width="65px" height="30px" fontSize="12px">
              중복 확인
            </Btn>
          </Grid>
        </Grid>

        <ItemText>
          <Link to="/settings/profile/changepasswd" variant="body2">
            비밀번호 변경
          </Link>
        </ItemText>

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
            <Btn width="65px" height="30px" fontSize="12px">
              변경하기
            </Btn>
          </Grid>
        </Grid>
        <ItemText>성별</ItemText>
        <Grid
          container
          xs={12}
          display="flex"
          align="left"
          alignItems="center"
          justifyContent="left"
        >
          <Grid item xs={4} align="left" justifyContent="left">
            <ItemText>연령대</ItemText>
          </Grid>
          <List
            component="nav"
            sx={{ bgcolor: 'background.paper', padding: 0 }}
          >
            <ListItem
              button
              id="lock-button2"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              sx={{ padding: 0 }}
            >
              <ListItemText secondary={options2[selectedIndex]} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button2',
              role: 'listbox',
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <ItemText>
          <Grid
            container
            xs={12}
            display="flex"
            align="left"
            alignItems="center"
            justifyContent="left"
          >
            <Grid item xs={4} align="left" justifyContent="left">
              <ItemText>선호 장르</ItemText>
            </Grid>

            <List
              component="nav"
              sx={{ bgcolor: 'background.paper', padding: 0 }}
            >
              <ListItem
                button
                id="lock-button2"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClickListItem2}
                sx={{ padding: 0 }}
              >
                <ListItemText secondary={options2[selectedIndex2]} />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                'aria-labelledby': 'lock-button2',
                role: 'listbox',
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              }}
            >
              {options2.map((option2, index) => (
                <MenuItem
                  key={option2}
                  disabled={index === 0}
                  selected={index === setSelectedIndex2}
                  onClick={(event) => handleMenuItemClick2(event, index)}
                >
                  {option2}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </ItemText>
        <WithDrawal>회원 탈퇴</WithDrawal>
      </Container>
    </>
  );
};

export default EditProfileMain;
