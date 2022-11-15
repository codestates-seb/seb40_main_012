import { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import TextField from '@mui/material/TextField';
import { setInputValue, setInputStatus } from '../../store/modules/signUpSlice';

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
  const { inputValue, inputStatus } = selectSignUP;

  const [inputHelperText, setInputHelperText] = useState('');

  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    dispatch(setInputValue({ id, value }));
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    if (required && value.length <= 0) {
      dispatch(setInputStatus({ id, value: 'error' }));
      setInputHelperText('필수 정보입니다.');
      return;
    }

    switch (id) {
      case 'nickName':
        isValidNickName(id, value);
        break;
      case 'email':
        isValidEmail(id, value);
        break;
      case 'password':
        isValidPassword(id, value);
        break;
      case 'passwordCheck':
        isValidPasswordCheck(id, value);
        break;
      default:
        break;
    }
  };

  const isValidNickName = (id, value) => {
    const regExp = /^[a-z0-9_-]{5,20}$/;

    if (!regExp.test(value)) {
      setInputHelperText(
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
      );
      dispatch(setInputStatus({ id, value: 'error' }));
      return;
    }

    // 중복확인 api
    // setInputHelperText('이미 사용중인 닉네임입니다.');
    // dispatch(setInputStatus({ id, value: 'error' }));

    // setInputHelperText('사용할 수 있는 닉네임입니다.');
    // dispatch(setInputStatus({ id, value: 'success' }));
    setInputHelperText('');
    dispatch(setInputStatus({ id, value: '' }));
  };

  const isValidEmail = (id, value) => {
    const regExp =
      /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;

    if (!regExp.test(value)) {
      setInputHelperText('이메일 주소를 다시 확인해주세요.');
      dispatch(setInputStatus({ id, value: 'error' }));
      return;
    }

    // 중복확인 api
    // setInputHelperText('이미 사용중인 이메일입니다.');
    // dispatch(setInputStatus({ id, value: 'error' }));

    // setInputHelperText('사용할 수 있는 이메일입니다.');
    // dispatch(setInputStatus({ id, value: 'success' }));
    setInputHelperText('');
    dispatch(setInputStatus({ id, value: '' }));
  };

  const isValidPassword = (id, value) => {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!regExp.test(value)) {
      setInputHelperText(
        '8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)를 사용하세요.'
      );
      dispatch(setInputStatus({ id, value: 'error' }));
      return;
    }

    setInputHelperText('');
    dispatch(setInputStatus({ id, value: '' }));
  };

  const isValidPasswordCheck = (id, value) => {
    if (value !== inputValue.password) {
      setInputHelperText('비밀번호가 일치하지 않습니다.');
      dispatch(setInputStatus({ id, value: 'error' }));
      return;
    }

    setInputHelperText('');
    dispatch(setInputStatus({ id, value: '' }));
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
          ? inputHelperText
          : ''
      }
      type={type}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SignUpTextField;
