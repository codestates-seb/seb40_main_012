import TextField from '@mui/material/TextField';

const ValidationTextFields = ({
  inputRef,
  refIndex,
  label,
  id,
  autoComplete,
  type = 'text',
  required = false,
  fullWidth = false,
  setInputValue,
  setIsValid,
  inputValue,
  inputStatus,
  inputHelperText,
  submit = false,
  size = 'medium',
}) => {
  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    setInputValue(id, value);
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    setIsValid(id, value, required);
  };

  const handleKeyDown = (event) => {
    if (!submit && event.code === 'Enter') event.preventDefault();
  };

  return (
    <TextField
      error={inputStatus === 'error'}
      inputRef={(el) => (inputRef.current[refIndex] = el)}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      value={inputValue}
      onChange={handleChangeInput}
      helperText={
        inputStatus === 'success' || inputStatus === 'error'
          ? inputHelperText
          : ''
      }
      type={type}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      size={size}
    />
  );
};

export default ValidationTextFields;
