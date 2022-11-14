import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

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
`;

const Nav = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={3} align="center">
          <CommentBorderCSS>
            <Typography variant="h6">나의 코멘트</Typography>
          </CommentBorderCSS>
        </Grid>
        <Grid item xs={3} align="center">
          <BorderCSS>
            <Typography variant="h6">나의 페어링</Typography>
          </BorderCSS>
        </Grid>
        <Grid item xs={3} align="center">
          <BorderCSS>
            <Typography variant="h6">나의 컬렉션</Typography>
          </BorderCSS>
        </Grid>
        <Grid item xs={3} align="center">
          <BorderCSS>
            <Typography variant="h6">나의 픽</Typography>
          </BorderCSS>
        </Grid>
      </Grid>
    </div>
  );
};
export default Nav;
