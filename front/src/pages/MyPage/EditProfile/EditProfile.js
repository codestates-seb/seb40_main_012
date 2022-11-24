import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import PageContainer from '../../../components/PageContainer';
import { OutlinedButton } from '../../../components/Buttons';
import ValidationTextFields from '../../../components/ValidationTextFields';
import {
  validationCheck,
  duplicationCheck,
  genderData,
  ageGroupData,
  genreData,
} from '../../../util/util';

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const TitleTextStyled = styled(Typography)`
  margin-top: 10px;
`;

const ItemWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
`;

const ItemWrapperWithHelperTextStyled = styled(ItemWrapperStyled)`
  height: 65px;
`;

const ItemWrapperWithHelperCheckBox = styled(ItemWrapperStyled)`
  height: 110px;
  margin-top: 10px;
`;

const ItemTextStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.gray};
  margin-left: 8px;
  width: 250px;
`;

const CheckboxFormControlStyled = styled(FormControl)`
  display: flex;
  align-items: flex-end;
`;

const CheckboxFormGroupStyled = styled(FormGroup)`
  flex-direction: row;
  justify-content: flex-end;
`;

const CheckBoxFormControlLabelStyled = styled(FormControlLabel)`
  span:last-child {
    font-size: 0.875rem;
  }
`;

const ButtonWrapperStyled = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
`;

const ButtonItemStyled = styled(ItemTextStyled)`
  width: auto;
  margin-right: 100px;
`;

const EditProfile = () => {
  const inputRef = useRef([]);
  const [inputValue, setInputValue] = useState({
    nickName: '',
    introduction: '',
  });
  const [inputStatus, setInputStatus] = useState({
    nickName: '',
    introduction: 'success',
  });
  const [inputHelperText, setInputHelperText] = useState({
    nickName: '',
    introduction: '0 / 50',
  });
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

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChangeInput = (id, value) => {
    if (id !== 'introduction') {
      setInputValue({
        ...inputValue,
        [id]: value,
      });

      return;
    }

    const valueLength = value.length;
    const lengthLimit = 50;

    if (valueLength > lengthLimit) return;
    setInputHelperText({
      ...inputHelperText,
      [id]: `${valueLength} / ${lengthLimit}`,
    });
    setInputValue({
      ...inputValue,
      [id]: value,
    });
  };

  const handleBlur = (id, value, required) => {
    const { test, errorMessage } = validationCheck(id, value, required);
    if (!test) {
      setInputStatus({
        ...inputStatus,
        [id]: 'error',
      });
      setInputHelperText({
        ...inputHelperText,
        [id]: errorMessage,
      });
      return;
    }

    switch (id) {
      case 'nickName':
        isValidNickName(id, value);
        break;
      default:
        break;
    }
  };

  const isValidNickName = async (id, value) => {
    try {
      const response = await duplicationCheck(id, value);
      const { status, message } = response;
      setInputStatus({
        ...inputStatus,
        [id]: status,
      });
      setInputHelperText({
        ...inputHelperText,
        [id]: message,
      });
    } catch (error) {
      const { status, message } = error;
      setInputStatus({
        ...inputStatus,
        [id]: status,
      });
      setInputHelperText({
        ...inputHelperText,
        [id]: message,
      });
    }
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
    <PageContainer footer center maxWidth="sm" bmt={5}>
      <Avatar
        sx={{
          bgcolor: '#A28BFF',
          width: 80,
          height: 80,
        }}
      >
        <img
          src="https://styles.redditmedia.com/t5_33mhbo/styles/profileIcon_7f1481qm5y291.jpeg?width=256&height=256&frame=1&crop=256:256,smart&s=6cc29126b9f6853db131a0f5189c8e86eff9a20e"
          alt="cat profile"
        ></img>
      </Avatar>
      <WrapperStyled>
        <TitleTextStyled component="h2" variant="h5" gutterBottom>
          기본정보
        </TitleTextStyled>
        <ItemWrapperWithHelperTextStyled>
          <ItemTextStyled component="h4">닉네임</ItemTextStyled>
          <ValidationTextFields
            inputRef={inputRef}
            refIndex={0}
            label=""
            id="nickName"
            autoComplete="nickname"
            fullWidth
            setInputValue={handleChangeInput}
            setIsValid={handleBlur}
            inputValue={inputValue.nickName}
            inputStatus={inputStatus.nickName}
            inputHelperText={inputHelperText.nickName}
            size="small"
            required
          />
        </ItemWrapperWithHelperTextStyled>
        <ItemWrapperWithHelperTextStyled>
          <ItemTextStyled component="h4">한 줄 소개</ItemTextStyled>
          <ValidationTextFields
            inputRef={inputRef}
            refIndex={1}
            label=""
            id="introduction"
            autoComplete="introduction"
            fullWidth
            setInputValue={handleChangeInput}
            setIsValid={handleBlur}
            inputValue={inputValue.introduction}
            inputStatus={inputStatus.introduction}
            inputHelperText={inputHelperText.introduction}
            size="small"
          />
        </ItemWrapperWithHelperTextStyled>
        <ItemWrapperStyled>
          <Link to="/mypage/profile/changepasswd">
            <ItemTextStyled component="h4">비밀번호 변경</ItemTextStyled>
          </Link>
        </ItemWrapperStyled>
        <TitleTextStyled component="h1" variant="h5" gutterBottom>
          상세정보
        </TitleTextStyled>
        <ItemWrapperStyled>
          <ItemTextStyled component="h4">성별</ItemTextStyled>
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small" fullWidth>
            <InputLabel id="gender-select-label"></InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={gender}
              onChange={handleChangeGender}
              label=""
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
        </ItemWrapperStyled>
        <ItemWrapperStyled>
          <ItemTextStyled component="h4">연령대</ItemTextStyled>
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small" fullWidth>
            <InputLabel id="age-select-label"></InputLabel>
            <Select
              labelId="age-select-label"
              id="age-select"
              value={age}
              onChange={handleChangeAge}
              label=""
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
        </ItemWrapperStyled>
        <ItemWrapperWithHelperCheckBox>
          <ItemTextStyled component="h4">선호 장르</ItemTextStyled>
          <CheckboxFormControlStyled
            component="fieldset"
            variant="standard"
            sx={{ m: 1 }}
          >
            <FormHelperText>
              선호 장르는 최대 3개까지 선택할 수 있습니다.
            </FormHelperText>

            <CheckboxFormGroupStyled>
              {Object.entries(genreData).map(([key, value]) => (
                <CheckBoxFormControlLabelStyled
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
          </CheckboxFormControlStyled>
        </ItemWrapperWithHelperCheckBox>
      </WrapperStyled>
      <ButtonWrapperStyled>
        <ButtonItemStyled component="h4">회원 탈퇴</ButtonItemStyled>
        <OutlinedButton size="medium">저장하기</OutlinedButton>
      </ButtonWrapperStyled>
    </PageContainer>
  );
};
export default EditProfile;
