import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  @media screen and (max-width: 490px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .nav-container-first {
    @media screen and (max-width: 490px) {
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 50%;
    }
  }
`;

const BorderCSS = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;

  :after {
    display: block;
    content: '';
    border-bottom: solid 3px ${({ theme }) => theme.colors.mainColor};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    text-decoration: none;
  }
  :hover:after {
    transform: scaleX(1);
  }
  .fromRight:after {
    transform-origin: 100% 50%;
  }
  .fromLeft:after {
    transform-origin: 0% 50%;
  }
`;

const BottomBorder = styled.div`
  position: relative;
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: solid 1px #eaeaea;
  }
`;

const CommentBorderCSS = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
  display: block;
  content: '';
  border-bottom: solid 3px ${({ theme }) => theme.colors.mainColor};
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const Nav = ({ view, setView }) => {
  return (
    <NavContainer>
      <Grid container justifyContent="space-around">
        <Grid
          item
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="nav-container-first"
          onClick={() => setView(1)}
        >
          {view === 1 ? (
            <>
              <CommentBorderCSS>
                <Typography variant="h6">
                  <img
                    src={process.env.PUBLIC_URL + '/images/mycomment_icon.svg'}
                    alt="my comment"
                  />
                  나의 코멘트
                </Typography>
              </CommentBorderCSS>
            </>
          ) : (
            <Link to="/mypage/mycomment">
              <BorderCSS>
                <Typography variant="h6">나의 코멘트</Typography>
              </BorderCSS>
            </Link>
          )}
        </Grid>

        <Grid
          item
          align="center"
          className="nav-container-first"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setView(2)}
        >
          {view === 2 ? (
            <>
              <CommentBorderCSS>
                <Typography variant="h6">
                  <img
                    src={process.env.PUBLIC_URL + '/images/mypairing_icon.svg'}
                    alt="my pairing"
                  />
                  나의 페어링
                </Typography>
              </CommentBorderCSS>
            </>
          ) : (
            <Link to="/mypage/mypairing">
              <BorderCSS>
                <Typography variant="h6">나의 페어링</Typography>
              </BorderCSS>
            </Link>
          )}
        </Grid>

        <Grid
          item
          align="center"
          className="nav-container-first"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setView(3)}
        >
          {view === 3 ? (
            <>
              <CommentBorderCSS>
                <Typography variant="h6">
                  <img
                    src={
                      process.env.PUBLIC_URL + '/images/mycollection_icon.svg'
                    }
                    alt="my collection"
                  />
                  나의 컬렉션
                </Typography>
              </CommentBorderCSS>
            </>
          ) : (
            <Link to="/mypage/mycollection">
              <BorderCSS>
                <Typography variant="h6">나의 컬렉션</Typography>
              </BorderCSS>
            </Link>
          )}
        </Grid>

        <Grid
          item
          align="center"
          className="nav-container-first"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setView(4)}
        >
          {view === 4 ? (
            <>
              <CommentBorderCSS>
                <Typography variant="h6">
                  <img
                    src={process.env.PUBLIC_URL + '/images/cherry.png'}
                    alt="bookmark icon"
                  />
                  나의 픽
                </Typography>
              </CommentBorderCSS>
            </>
          ) : (
            <Link to="/mypage/mypick">
              <BorderCSS>
                <Typography variant="h6">나의 픽</Typography>
              </BorderCSS>
            </Link>
          )}
        </Grid>
      </Grid>
      <BottomBorder />
    </NavContainer>
  );
};
export default Nav;
