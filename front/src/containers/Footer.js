import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const FooterContainer = styled.div`
  width: 100%;
  height: 200px;
  padding: 30px 60px;
  background-color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 640px) {
    padding: 20px;
    height: 170px;
  }
  @media screen and (max-width: 500px) {
    padding: 10px 20px;
    height: 120px;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
`;

const FooterContent_1 = styled(FooterContent)`
  font-size: 12px;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
  div {
    color: ${({ theme }) => theme.colors.lightgray};
    flex-grow: 1;
    font-weight: 700;
  }
  button {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.lightgray};
    &:hover {
      cursor: pointer;
    }
    font-weight: 600;
  }
`;
const FooterContent_2 = styled(FooterContent)`
  font-size: 12px;
  @media screen and (max-width: 500px) {
    font-size: 10px;
    img {
      width: 15px;
      height: 15px;
    }
  }
  a:link,
  a:visited {
    color: ${({ theme }) => theme.colors.lightgray};
    text-decoration: none;
    margin-left: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const FooterContent_3 = styled(FooterContent)`
  img {
    margin-top: 20px;
    @media screen and (max-width: 500px) {
      margin-top: 10px;
      width: 80px;
    }
  }
`;

const VersionStyled = styled.div`
  display: none;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent_1>
        <div className="copyright">Copyright Ⓒ Running_Potatoes 2022.</div>
        {/* <Link to="/pairing">
          <button>페어링</button>
        </Link>
        <Link to="/collection">
          <button>컬렉션</button>
        </Link> */}
      </FooterContent_1>
      <FooterContent_2>
        <img
          src={process.env.PUBLIC_URL + '/images/github_icon.svg'}
          alt="github icon"
        />
        <a href="https://github.com/codestates-seb/seb40_main_012">github</a>
      </FooterContent_2>
      <FooterContent_3>
        <img
          src={process.env.PUBLIC_URL + '/images/CherryPick_Footer.svg'}
          alt="Footer Logo"
        />
      </FooterContent_3>
      <VersionStyled>{process.env.REACT_APP_SERVICE_VERSION}</VersionStyled>
    </FooterContainer>
  );
};

export default Footer;
