import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import TextField from '@mui/material/TextField';
import { setInputValue, setIsValid } from '../../store/modules/signUpSlice';

const SignUpTextField = ({
  inputRef,
  refIndex,
  label,
  id,
  autoComplete,
  type,
  required,
  fullWidth,
}) => {
  const dispatch = useDispatch();
  const selectSignUP = useSelector((state) => state.signUp, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignUP;

  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    dispatch(setInputValue({ id, value }));
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    dispatch(setIsValid(id, value, required));
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Enter') event.preventDefault();
  };

  return (
    <TextField
      error={inputStatus[id] === 'error'}
      inputRef={(el) => (inputRef.current[refIndex] = el)}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      value={inputValue[id]}
      onChange={handleChangeInput}
      helperText={
        inputStatus[id] === 'success' || inputStatus[id] === 'error'
          ? inputHelperText[id]
          : ''
      }
      type={type}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SignUpTextField;
