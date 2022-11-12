import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { Link } from 'react-router-dom';
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
  margin: 0 15px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const CollectionBtn = styled(HeaderBtn)``;
const PairingBtn = styled(HeaderBtn)`
  margin-right: 330px;
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
          <CollectionBtn>컬렉션</CollectionBtn>
        </Link>
        <Link to="/pairing">
          <PairingBtn>페어링</PairingBtn>
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
