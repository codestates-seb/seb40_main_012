import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Grid from '@mui/material/Grid';
import ValidationTextFields from '../../components/ValidationTextFields';
import { setInputValue, setIsValid } from '../../store/modules/signUpSlice';

const inputInfo = [
  {
    label: '별명',
    id: 'nickName',
    autoComplete: 'nickname',
    type: 'text',
  },
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
  {
    label: '비밀번호 재확인',
    id: 'passwordCheck',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const SignUpTextFields = () => {
  const dispatch = useDispatch();
  const inputRef = useRef([]);
  const selectSignUP = useSelector((state) => state.signUp, shallowEqual);
  const { inputValue, inputStatus, inputHelperText } = selectSignUP;

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

export default SignUpTextFields;
