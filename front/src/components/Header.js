import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../store/modules/authSlice';
import { logout } from '../api/authApi';

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5050;
  div.header_left {
    display: flex;
    align-items: center;
  }
  div.header_right {
    display: flex;
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  margin: 0 40px;
  margin-top: 7px;
`;

const HeaderBtn = styled.button`
  background-color: transparent;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-bottom: 3px solid transparent;
  margin: 0 15px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const PairingBtn = styled(HeaderBtn)`
  height: 60px;
  border-top: 3px solid transparent;
  &:hover,
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const CollectionBtn = styled(HeaderBtn)`
  height: 60px;
  border-top: 3px solid transparent;
  &:hover,
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const LoginOutBtn = styled(HeaderBtn)`
  font-size: 13px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  margin-left: 10px;
`;

const MyPageIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  &:hover {
    cursor: pointer;
  }
`;

//Redux Toolkit 참고용 나중에 삭제!!
const RTKBtn = styled(HeaderBtn)`
  height: 60px;
  border-top: 3px solid transparent;
  &:hover,
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const Header = () => {
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);

  const navigate = useNavigate();

  const handleClickLogoutButton = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickMypageBtn = () => {
    if (isLogin) {
      navigate('/mypage');
    } else {
      navigate('/user/signin');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <div className="header_left">
          <LogoContainer>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + '/images/CherryPick.svg'}
                alt="CherryPick main logo"
              />
            </Link>
          </LogoContainer>
          <Link to="/pairing">
            <PairingBtn
              className={location.pathname === '/pairing' ? 'selected' : null}
            >
              페어링
            </PairingBtn>
          </Link>
          <Link to="/collection">
            <CollectionBtn
              className={
                location.pathname === '/collection' ? 'selected' : null
              }
            >
              컬렉션
            </CollectionBtn>
          </Link>
          {/* Redux Toolkit 참고용 페이지!! */}
          <Link to="/redux">
            <RTKBtn
              className={location.pathname === '/redux' ? 'selected' : null}
            >
              Redux TK
            </RTKBtn>
          </Link>
        </div>
        <div className="header_right">
          <Searchbar />
          {isLogin ? (
            <LoginOutBtn onClick={handleClickLogoutButton}>
              로그아웃
            </LoginOutBtn>
          ) : (
            <Link to="/user/signin">
              <LoginOutBtn>로그인</LoginOutBtn>
            </Link>
          )}
          <MyPageIconContainer onClick={handleClickMypageBtn}>
            <img
              src={process.env.PUBLIC_URL + '/images/Mypage_Icon.svg'}
              alt="Mypage Icon"
            />
          </MyPageIconContainer>
        </div>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
