import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import { Searchbar } from 'components';
import { selectIsLogin, selectProfileImage } from 'store/modules/authSlice';
import { dummyUserImgUrl } from 'util/userAvatar';
import { authApi } from 'api';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';

const drawerWidth = 240;
const BOOK = '책';
const PAIRING = '페어링';
const COLLECTION = '컬렉션';
const MY_PAGE = '마이페이지';
const LOGOUT = '로그아웃';
const SIGN_IN = '로그인';
const SIGN_UP = '회원가입';

const navItems = [BOOK, PAIRING, COLLECTION];
const loginUserItems = [
  { text: MY_PAGE, icon: <AccountCircle /> },
  { text: LOGOUT, icon: <LogoutIcon /> },
];
const nonMembersItems = [
  { text: SIGN_IN, icon: <LoginIcon /> },
  { text: SIGN_UP, icon: <AccountCircle /> },
];

const HeaderContainerStyled = styled(AppBar)`
  height: 60px;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  /* z-index: 5050; */
  box-shadow: none;
`;

const ToolbarStyled = styled(Toolbar)`
  min-height: 60px;
`;

const LogoContainerStyled = styled.div`
  margin: 0 40px 0 20px;
`;

const LogoSytled = styled.img`
  padding: 17px 0 10px;
`;

const HeaderBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  white-space: nowrap;
  &:hover {
    background-color: transparent;
  }
`;

const HeaderItemButtonStyled = styled(HeaderBtn)`
  font-size: 16px;
  font-weight: 700;
  margin: 0 15px;
  border-bottom: 3px solid transparent;
  height: 60px;
  border-top: 3px solid transparent;
  border-radius: 0;
  white-space: nowrap;
  &:hover,
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const DrawerListItemButtonStyled = styled(ListItemButton)`
  &.selected {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_3};
  }
`;

const AuthButtounStyled = styled(HeaderBtn)`
  font-size: 13px;
  font-weight: 400;
  &:hover {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const MyPageIconContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px 0 10px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
`;

const logo = (
  <Link to="/">
    <LogoSytled
      src={process.env.PUBLIC_URL + '/images/CherryPick.svg'}
      alt="CherryPick main logo"
    />
  </Link>
);

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);
  const profileImage = useSelector(selectProfileImage);

  const userNavListItem = (arr) =>
    arr.map(({ text, icon }, index) => (
      <ListItem key={text} disablePadding>
        <DrawerListItemButtonStyled
          onClick={handleClickDrawerListItem}
          className={selectedIndex.right === index ? 'selected' : ''}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </DrawerListItemButtonStyled>
      </ListItem>
    ));

  const userAvatar = (
    <Avatar
      alt="Mypage Icon"
      src={profileImage ? profileImage : dummyUserImgUrl}
      sx={{ width: 32, height: 32 }}
    />
  );

  const { window } = props;
  const [drawerOpen, setDrawerOpen] = useState({
    left: false,
    right: false,
  });
  const [selectedIndex, setSelectedIndex] = useState({
    left: null,
    right: null,
  });

  useEffect(() => {
    const { pathname } = location;
    if (pathname.startsWith('/pairing')) {
      setSelectedIndex({ ...selectedIndex, left: navItems.indexOf(PAIRING) });
      return;
    }
    if (pathname.startsWith('/collection')) {
      setSelectedIndex({
        ...selectedIndex,
        left: navItems.indexOf(COLLECTION),
      });
      return;
    }
  }, [location]);

  const handleDrawerToggle = (anchor) => {
    setDrawerOpen((prev) => {
      return { ...prev, [anchor]: !prev[anchor] };
    });
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleClickDrawerListItem = (e) => {
    switch (e.target.textContent) {
      case BOOK:
        navigate('/book');
        break;
      case PAIRING:
        navigate('/pairing');
        break;
      case COLLECTION:
        navigate('/collection');
        break;
      case SIGN_IN:
        navigate('/user/signin');
        break;
      case SIGN_UP:
        navigate('/user/signup');
        break;
      case MY_PAGE:
        navigate('/mypage');
        break;
      case LOGOUT:
        handleClickLogoutButton();
        break;
      default:
        break;
    }
  };

  const handleClickNavigateButton = (url) => {
    navigate(url);
  };

  const handleClickLogoutButton = async () => {
    try {
      await authApi.logout();
      dispatch(
        setOpenSnackbar({
          severity: 'success',
          message: '로그아웃되었습니다.',
        })
      );
    } catch (error) {
      const { message } = error;
      dispatch(
        setOpenSnackbar({
          severity: 'error',
          message: message,
        })
      );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderContainerStyled component="nav">
        <ToolbarStyled>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => handleDrawerToggle('left')}
            sx={{ mr: 2, display: { md: 'none' }, flex: '0 0 0' }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
              flexGrow: 1,
            }}
          >
            <LogoContainerStyled>{logo}</LogoContainerStyled>
            {navItems.map((item, index) => (
              <HeaderItemButtonStyled
                sx={{ display: { sm: 'none', md: 'flex' } }}
                className={selectedIndex.left === index ? 'selected' : ''}
                key={item}
                onClick={handleClickDrawerListItem}
              >
                {item}
              </HeaderItemButtonStyled>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: { xs: '1 0 auto', sm: '0 1 0' },
            }}
          >
            <Searchbar />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              {isLogin ? (
                <>
                  <AuthButtounStyled onClick={handleClickLogoutButton}>
                    {LOGOUT}
                  </AuthButtounStyled>
                  <MyPageIconContainer to="/mypage">
                    {userAvatar}
                  </MyPageIconContainer>
                </>
              ) : (
                <>
                  <AuthButtounStyled
                    onClick={() => handleClickNavigateButton('/user/signin')}
                  >
                    {SIGN_IN}
                  </AuthButtounStyled>
                  <AuthButtounStyled
                    onClick={() => handleClickNavigateButton('/user/signup')}
                  >
                    {SIGN_UP}
                  </AuthButtounStyled>
                </>
              )}
            </Box>
            <IconButton
              size="large"
              aria-label="show more"
              onClick={() => {
                handleDrawerToggle('right');
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                marginLeft: '16px',
                marginRight: '-12px',
                padding: '8px',
                flex: '0 0 0',
              }}
            >
              {isLogin ? userAvatar : <MoreIcon />}
            </IconButton>
          </Box>
        </ToolbarStyled>
      </HeaderContainerStyled>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen.left}
          onClose={() => handleDrawerToggle('left')}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: '1500',
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            onClick={() => handleDrawerToggle('left')}
            sx={{ textAlign: 'center' }}
          >
            {logo}
            <Divider />
            <List>
              {navItems.map((item, index) => (
                <ListItem key={item} disablePadding>
                  <DrawerListItemButtonStyled
                    sx={{ textAlign: 'center' }}
                    onClick={handleClickDrawerListItem}
                    className={selectedIndex.left === index ? 'selected' : ''}
                  >
                    <ListItemText primary={item} />
                  </DrawerListItemButtonStyled>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={drawerOpen.right}
          onClose={() => handleDrawerToggle('right')}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: '1500',
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            onClick={() => handleDrawerToggle('right')}
            sx={{ textAlign: 'center' }}
          >
            <List>
              {isLogin
                ? userNavListItem(loginUserItems)
                : userNavListItem(nonMembersItems)}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
