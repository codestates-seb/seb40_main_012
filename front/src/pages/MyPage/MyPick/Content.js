import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import MyPickBook from './MyPickBook';
import MyPickPairing from './MyPickPairing';
import MyPickCollection from './MyPickCollection';
import { useState } from 'react';
import MyPickGuide from './MyPickGuide';
import { BasicButton } from '../../../components/Buttons';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

const ContentContainer = styled.div`
  margin-bottom: 10rem;

  .buttons {
    @media screen and (max-width: 490px) {
      justify-content: center;
    }
  }

  .toggle-button {
    @media screen and (max-width: 490px) {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 50px;
    }
  }

  img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100px;
    height: 100px;
  }
  .fixed {
    position: fixed;
  }
  .button-container {
    @media screen and (max-width: 490px) {
      display: flex;
      align-items: center;
      justify-content: center !important;
    }
  }
  .toggle-button {
    @media screen and (max-width: 490px) {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 50px;
    }
  }
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),

    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = ({ content }) => {
  const [view, setView] = useState(1);
  const [alignment, setAlignment] = React.useState('left');
  const navigate = useNavigate();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      {content ? (
        <ContentContainer>
          <Grid
            container
            className="button-container"
            style={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={5} sx={{ mt: 1, mb: 1, ml: 1 }}>
              <CommentContainer className="buttons">
                <StyledToggleButtonGroup
                  className="button-container"
                  size="small"
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                  sx={{ ml: 0 }}
                >
                  <ToggleButton
                    className="toggle-button"
                    onClick={() => setView(1)}
                    value="left"
                    aria-label="left aligned"
                  >
                    페어링
                  </ToggleButton>
                  <ToggleButton
                    className="toggle-button"
                    onClick={() => setView(2)}
                    value="center"
                    aria-label="centered"
                  >
                    컬렉션
                  </ToggleButton>
                  <ToggleButton
                    className="toggle-button"
                    onClick={() => setView(3)}
                    value="right"
                    aria-label="right aligned"
                  >
                    책
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </CommentContainer>
            </Grid>

            <Grid
              item
              xs={6.5}
              sx={{
                ml: 3,
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
              style={{
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <MyPickGuide />
            </Grid>
          </Grid>

          <div>
            {view === 1 ? <MyPickPairing /> : null}

            {view === 2 ? <MyPickCollection /> : null}

            {view === 3 ? <MyPickBook /> : null}
          </div>
        </ContentContainer>
      ) : (
        <>
          <ContentContainer>
            <Grid
              container
              style={{
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={5} sx={{ mt: 1, mb: 1, ml: 1 }}>
                <CommentContainer className="buttons">
                  <StyledToggleButtonGroup
                    className="button-container"
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    sx={{ ml: 0 }}
                  >
                    <ToggleButton
                      className="toggle-button"
                      onClick={() => setView(1)}
                      value="left"
                      aria-label="left aligned"
                    >
                      페어링
                    </ToggleButton>
                    <ToggleButton
                      className="toggle-button"
                      onClick={() => setView(2)}
                      value="center"
                      aria-label="centered"
                    >
                      컬렉션
                    </ToggleButton>
                    <ToggleButton
                      className="toggle-button"
                      onClick={() => setView(3)}
                      value="right"
                      aria-label="right aligned"
                    >
                      책
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </CommentContainer>
              </Grid>

              <Grid
                item
                xs={6.5}
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <MyPickGuide className="move-guide" />
              </Grid>
            </Grid>
            <div className="no-data-notice">
              <Typography
                sx={{
                  mt: 1,
                  mb: 1,
                  fontSize: 17,
                  fontWeight: 300,
                }}
                color="#2e3031"
                variant="body2"
                gutterBottom
                component={'span'}
              >
                읽어올 데이터가 없습니다
                <br />
                메인 페이지에서 체리픽의 새로운 추천을 만나보세요!
                <br />
                <br />
                <BasicButton onClick={() => navigate(`/`)}>
                  메인 페이지
                </BasicButton>
              </Typography>
            </div>
          </ContentContainer>
        </>
      )}
    </>
  );
};

export default Content;
