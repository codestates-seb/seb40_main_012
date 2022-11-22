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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
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

const ListItemStyled = styled(ListItem)`
  justify-content: space-between;
`;

const ListItemTextStyled = styled(ListItemText)`
  flex: 1 0 90px;
`;

const CheckboxFormControlStyled = styled(FormControl)`
  display: flex;
  align-items: flex-end;
`;

const CheckboxFormGroupStyled = styled(FormGroup)`
  flex-direction: row;
  justify-content: flex-end;
`;

const FirstLoginPage = () => {
  const location = useLocation();
  console.log(location);

  const [open, setOpen] = React.useState(true);
  const [age, setAge] = React.useState('');
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCheckBox = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = Object.values(state).filter((v) => v).length <= 3;

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
              <ListItemStyled>
                <ListItemTextStyled primary="성별" />
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="gender-select-label">성별</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="성별"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>
              </ListItemStyled>
              <Divider />
              <ListItemStyled>
                <ListItemTextStyled primary="연령대" />
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="age-select-label">연령대</InputLabel>
                  <Select
                    labelId="age-select-label"
                    id="age-select"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="연령대"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>
              </ListItemStyled>
              <Divider />
              <ListItemStyled>
                <ListItemTextStyled primary="선호장르" />
                <CheckboxFormControlStyled
                  error={error}
                  component="fieldset"
                  variant="standard"
                  sx={{ m: 1 }}
                >
                  <CheckboxFormGroupStyled>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckBox}
                          name="gilad"
                        />
                      }
                      checked={gilad}
                      disabled={true}
                      label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jason}
                          onChange={handleChangeCheckBox}
                          name="jason"
                        />
                      }
                      label="Jason Killian"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={antoine}
                          onChange={handleChangeCheckBox}
                          name="antoine"
                        />
                      }
                      label="Antoine Llorca"
                    />
                  </CheckboxFormGroupStyled>
                  <FormHelperText>You can display an error</FormHelperText>
                </CheckboxFormControlStyled>
              </ListItemStyled>
            </List>
          </Dialog>
        </Box>
      </ThemeProvider>
    </PageContainer>
  );
};

export default FirstLoginPage;
