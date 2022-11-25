import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Grid from '@mui/material/Grid';
import { ValidationTextFields } from 'components';
import { setInputValue, setIsValid } from 'store/modules/signInSlice';

const inputInfo = [
  {
    label: '이메일',
    id: 'email',
    autoComplete: 'email',
    type: 'text',
  },
  {
    label: '비밀번호',
    id: 'password',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const SignInTextFields = () => {
  const dispatch = useDispatch();
  const inputRef = useRef([]);
  const selectSignIn = useSelector((state) => state.signIn, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignIn;

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChangeInput = useCallback((id, value) => {
    dispatch(setInputValue({ id, value }));
  });

  const handleBlur = useCallback((id, value, required) => {
    dispatch(setIsValid(id, value, required));
  });

  return (
    <>
      {inputInfo.map((v, i) => (
        <Grid key={v.id} item xs={12}>
          <ValidationTextFields
            inputRef={inputRef}
            refIndex={i}
            label={v.label}
            id={v.id}
            autoComplete={v.autoComplete}
            type={v.type}
            required
            fullWidth
            setInputValue={handleChangeInput}
            setIsValid={handleBlur}
            inputValue={inputValue[v.id]}
            inputStatus={inputStatus[v.id]}
            inputHelperText={inputHelperText[v.id]}
            submit={inputInfo.length - 1 === i ? true : false}
          />
        </Grid>
      ))}
    </>
  );
};

export default SignInTextFields;
