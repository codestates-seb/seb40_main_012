import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setCloseSnackbar } from 'store/modules/snackbarSlice';

const SnackbarStyled = styled(Snackbar)`
  top: 65px;
  z-index: 1199;
`;

const SnackbarComponent = () => {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(setCloseSnackbar(false));
  };

  const snackbar = useSelector((state) => state.snackbar, shallowEqual);
  const { open, severity, message } = snackbar;

  return (
    <SnackbarStyled
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </SnackbarStyled>
  );
};

export default SnackbarComponent;
