import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import PageContainer from '../../../components/PageContainer';
import { OutlinedButton } from '../../../components/Buttons';
import ValidationTextFields from '../../../components/ValidationTextFields';
import { validationCheck, duplicationCheck } from '../../../util/util';

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const TitleTextStyled = styled(Typography)`
  margin-top: 20px;
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

const ItemTextStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.gray};
  margin-left: 8px;
  width: 250px;
`;

const EditProfile = () => {
  const inputRef = useRef([]);
  const [inputValue, setInputValue] = useState({
    nickName: '',
    introduction: '',
  });
  const [inputStatus, setInputStatus] = useState({
    nickName: '',
    introduction: '',
  });
  const [inputHelperText, setInputHelperText] = useState({
    nickName: '',
    introduction: '',
  });

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChangeInput = (id, value) => {
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

  return (
    <PageContainer footer center maxWidth="sm">
      <Avatar
        sx={{
          mt: 3,
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
        <ItemWrapperStyled>
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
        </ItemWrapperStyled>
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
        </ItemWrapperStyled>
        <ItemWrapperStyled>
          <ItemTextStyled component="h4">연령대</ItemTextStyled>
        </ItemWrapperStyled>
        <ItemWrapperStyled>
          <ItemTextStyled component="h4">선호 장르</ItemTextStyled>
        </ItemWrapperStyled>
      </WrapperStyled>
      <OutlinedButton size="medium">저장하기</OutlinedButton>
    </PageContainer>
  );
};
export default EditProfile;
