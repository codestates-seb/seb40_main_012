// import styled from 'styled-components';
import TextField from '@mui/material/TextField';
// const PassWdInput = styled.input`
//   border-bottom: solid 1px white;
//   appearance: none;
//   height: 20px;
//   outline: 0;
//   font-size: 16px;
//   border-width: 0 0 2px;
//   border-color: #cfc3ff;
//   margin-top: 18px;
//   :focus {
//     border-color: #a28bff;
//   }
//   width: 100%;
// `;

// const TitleText = styled.div`
//   width: 100%;
//   font-size: 16px;
//   font-weight: 400;
//   margin-top: 30px;
// `;
const PassWdTextFields = ({
  inputRef,
  refIndex,
  label,
  id,
  autoComplete,
  type,
  required,
  fullWidth,
  setInputValue,
  setIsValid,
  inputValue,
  inputStatus,
  inputHelperText,
  submit,
}) => {
  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    setInputValue(id, value);
    console.log(event.target.id, event.target.value);
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    setIsValid(id, value, required);
  };

  const handleKeyDown = (event) => {
    if (!submit && event.code === 'Enter') event.preventDefault();
  };

  return (
    <>
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
      />
    </>
  );
};

export default PassWdTextFields;
