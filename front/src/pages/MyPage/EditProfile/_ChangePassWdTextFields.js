import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Grid from '@mui/material/Grid';
import PassWdTextFields from './PassWdTextFields';
import {
  setInputValue,
  setIsValid,
} from '../../../store/modules/changePassWdSlice';

const inputInfo = [
  {
    label: '현재 비밀번호',
    id: 'currentPassword',
    autoComplete: 'password',
    type: 'password',
  },
  {
    label: '새 비밀번호',
    id: 'password',
    autoComplete: 'new-password',
    type: 'password',
  },
  {
    label: '비밀번호 확인',
    id: 'passwordCheck',
    autoComplete: 'new-password',
    type: 'password',
  },
];

const ChangePassWdTextFields = () => {
  const dispatch = useDispatch();
  const inputRef = useRef([]);
  const selectChangePassWd = useSelector(
    (state) => state.changePassWd,
    shallowEqual
  );
  const { inputValue, inputStatus, inputHelperText } = selectChangePassWd;

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
          <PassWdTextFields
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

export default ChangePassWdTextFields;
