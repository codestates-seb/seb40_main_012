import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetMyCommentList } from '../../../store/modules/commentSlice';

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
  /* border-bottom: solid 1px ${({ theme }) => theme.colors.lightgray}; */
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 94.2%;
    left: 5.8%;
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
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 50%;
`;

const Nav = () => {
  const CommentData = useSelector((state) =>
    state.myComment.data.length !== 0
      ? state.myComment.data.data.content
      : false
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetMyCommentList());
  }, [dispatch]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container>
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
              <Typography variant="h6">나의 코멘트</Typography>
            </CommentBorderCSS>
            <Circle className="circle">
              <Typography variant="h6" style={{ color: 'white' }}>
                {CommentData.length}
              </Typography>
            </Circle>
          </Grid>
          <Grid item xs={2.9} align="center">
            <Link to="/mypage/mypairing">
              <BorderCSS>
                <Typography variant="h6">나의 페어링</Typography>
              </BorderCSS>
            </Link>
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
        <BottomBorder />
      </ThemeProvider>
    </div>
  );
};
export default Nav;
