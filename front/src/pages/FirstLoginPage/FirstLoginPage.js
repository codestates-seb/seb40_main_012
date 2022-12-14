import { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { PageContainer } from 'containers';
import styled from 'styled-components';
import { genreData, ageGroupData, genderData } from 'util/util';
import { firstLoginAsync } from 'store/modules/authSlice';
import { setOpenSnackbar } from 'store/modules/snackbarSlice';

const Transition = forwardRef(function Transition(props, ref) {
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
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [checked, setChecked] = useState({
    NOVEL: false,
    ESSAY: false,
    POEM: false,
    HUMANITIES: false,
    SOCIAL: false,
    NATURAL: false,
    COMICS: false,
    ETC: false,
  });
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    setBackdropOpen(loading);
  }, [loading]);

  const handleClose = () => {
    dispatch(firstLoginAsync({}));
    dispatch(
      setOpenSnackbar({
        severity: 'info',
        message:
          "??????????????? '??????????????? > ??? ?????? ??????'?????? ???????????? ??? ????????????",
      })
    );
  };

  const handleClickSave = () => {
    const params = {};
    const genresArray = Object.entries(checked)
      .filter((v) => v[1])
      .map((v) => v[0]);

    if (gender.length > 0) params.genderType = gender;
    if (age.length > 0) params.age = age;
    if (genresArray.length > 0) params.genres = genresArray;

    dispatch(firstLoginAsync(params))
      .unwrap()
      .then(() => {
        dispatch(
          setOpenSnackbar({
            severity: 'success',
            message: '??????????????? ?????????????????????.',
          })
        );
      })
      .catch((error) => {
        const { message, status } = error;
        if (status === 400) return;
        dispatch(
          setOpenSnackbar({
            severity: 'error',
            message: message,
          })
        );
      });
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeCheckBox = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const checkCount = Object.values(checked).filter((v) => v).length >= 3;

  return (
    <PageContainer footer center backdrop={backdropOpen}>
      <Dialog open={true} TransitionComponent={Transition}>
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
            <SaveButtonStyled color="inherit" onClick={handleClickSave}>
              ??????
            </SaveButtonStyled>
          </ToolbarStyled>
        </AppBarStyled>
        <List>
          <ListItemStyled>
            <ListItemTextStyled primary="??????" />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="gender-select-label">??????</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={gender}
                onChange={handleChangeGender}
                autoWidth
                label="??????"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(genderData).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItemStyled>
          <Divider />
          <ListItemStyled>
            <ListItemTextStyled primary="?????????" />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="age-select-label">?????????</InputLabel>
              <Select
                labelId="age-select-label"
                id="age-select"
                value={age}
                onChange={handleChangeAge}
                autoWidth
                label="?????????"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(ageGroupData).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItemStyled>
          <Divider />
          <ListItemStyled>
            <ListItemTextStyled primary="?????? ??????" />
            <CheckboxFormControlStyled
              component="fieldset"
              variant="standard"
              sx={{ m: 1 }}
            >
              <CheckboxFormGroupStyled>
                {Object.entries(genreData).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox onChange={handleChangeCheckBox} name={key} />
                    }
                    checked={checked[key]}
                    disabled={checkCount && !checked[key]}
                    label={value}
                  />
                ))}
              </CheckboxFormGroupStyled>
              <FormHelperText>
                ?????? ????????? ?????? 3????????? ????????? ??? ????????????.
              </FormHelperText>
            </CheckboxFormControlStyled>
          </ListItemStyled>
        </List>
      </Dialog>
    </PageContainer>
  );
};

export default FirstLoginPage;
