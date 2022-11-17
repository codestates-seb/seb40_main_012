const validationCheck = (type, value, required) => {
  let regExp = null;
  let errorMessage = '';

  if (required && value.length <= 0)
    return { test: false, errorMessage: message.valid.requiredError };

  switch (type) {
    case 'nickName':
      regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,20}$/;
      errorMessage = message.valid.nickNameError;
      return { test: regExp.test(value), errorMessage };
    case 'email':
      regExp =
        /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;
      errorMessage = message.valid.emailError;
      return { test: regExp.test(value), errorMessage };
    case 'password':
      regExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      errorMessage = message.valid.passwordError;
      return { test: regExp.test(value), errorMessage };
    default:
      return { test: true, errorMessage };
  }
};

const message = {
  valid: {
    requiredError: '필수 정보입니다.',
    nickNameError: '3~20자의 한글, 영문, 숫자만 사용 가능합니다.',
    emailError: '이메일 주소를 다시 확인해주세요.',
    passwordError: '8~16자 영문, 숫자, 특수문자(@$!%*?&)를 사용하세요.',
  },
  duplicate: {
    nickNameError: '이미 사용중인 닉네임입니다.',
    nickNameSuccess: '사용할 수 있는 닉네임입니다.',
    emailNameError: '이미 사용중인 닉네임입니다.',
    emailNameSuccess: '사용할 수 있는 닉네임입니다.',
  },
};

export { validationCheck };
