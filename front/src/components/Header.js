import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useLocation, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

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
`;

const LogoContainer = styled.div`
  margin: 0 40px;
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

const CollectionBtn = styled(HeaderBtn)`
  height: 60px;
  &:hover,
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;
const PairingBtn = styled(HeaderBtn)`
  margin-right: 330px;
  height: 60px;
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
  }
  position: absolute;
  top: 22px;
  right: 80px;
`;

const MyPageIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  img {
    position: absolute;
    right: 40px;
  }
`;

const Header = ({ isLogin = false }) => {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + '/images/CherryPick.svg'}
              alt="CherryPick main logo"
            />
          </Link>
        </LogoContainer>
        <Link to="/collection">
          <CollectionBtn
            className={location.pathname === '/collection' ? 'selected' : null}
          >
            컬렉션
          </CollectionBtn>
        </Link>
        <Link to="/pairing">
          <PairingBtn
            className={location.pathname === '/pairing' ? 'selected' : null}
          >
            페어링
          </PairingBtn>
        </Link>
        <Searchbar />
        {isLogin ? (
          <LoginOutBtn>로그아웃</LoginOutBtn>
        ) : (
          <Link to="/user/signin">
            <LoginOutBtn>로그인</LoginOutBtn>
          </Link>
        )}
        <Link to="/mypage">
          <MyPageIconContainer>
            <img
              src={process.env.PUBLIC_URL + '/images/Mypage_Icon.svg'}
              alt="Mypage Icon"
            />
          </MyPageIconContainer>
        </Link>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
