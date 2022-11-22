import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import PageContainer from '../../components/PageContainer';
import theme from '../../styles/theme';
import styled from 'styled-components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppBarStyled = styled(AppBar)`
  background-color: ${({ theme }) => theme.colors.darkgray};
`;

const ToolbarStyled = styled(Toolbar)`
  justify-content: space-between;
`;

const SaveButtonStyled = styled(Button)`
  font-size: 1rem;
  padding: 6px 0px;
  min-width: auto;
`;

const FirstLoginPage = () => {
  const location = useLocation();
  console.log(location);

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageContainer footer>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 60px - 200px)', // header, footer
          }}
        >
          <div>
            <Dialog open={open} TransitionComponent={Transition}>
              <AppBarStyled sx={{ position: 'relative' }}>
                <ToolbarStyled>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <SaveButtonStyled color="inherit" onClick={handleClose}>
                    저장
                  </SaveButtonStyled>
                </ToolbarStyled>
              </AppBarStyled>
              <List>
                <ListItem button>
                  <ListItemText primary="성별" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="연령대" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="선호장르" />
                </ListItem>
              </List>
            </Dialog>
          </div>
        </Box>
      </ThemeProvider>
    </PageContainer>
  );
};

export default FirstLoginPage;
