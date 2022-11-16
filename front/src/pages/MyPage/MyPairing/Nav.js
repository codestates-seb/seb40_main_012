import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    border-bottom: solid 3px #e8e2ff;
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
  border-bottom: solid 3px #e8e2ff;
  align-items: center;
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #e8e2ff;
  border-radius: 50%;
`;

const Nav = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={2.9} align="center">
          <Link to="/mypage/mycomment">
            <BorderCSS>
              <Typography variant="h6">나의 코멘트</Typography>
            </BorderCSS>
          </Link>
        </Grid>

        <Grid
          item
          xs={3.3}
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CommentBorderCSS>
            <Typography variant="h6">나의 페어링</Typography>
          </CommentBorderCSS>
          <Circle className="circle">
            <Typography variant="h6" style={{ color: 'white' }}>
              3
            </Typography>
          </Circle>
        </Grid>

        <Grid item xs={2.9} align="center">
          <Link to="/mypage/mycollection">
            <BorderCSS>
              <Typography variant="h6">나의 컬렉션</Typography>
            </BorderCSS>
          </Link>
        </Grid>
        <Grid item xs={2.9} align="center">
          <Link to="/mypage/mypick">
            <BorderCSS>
              <Typography variant="h6">나의 픽</Typography>
            </BorderCSS>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
export default Nav;
