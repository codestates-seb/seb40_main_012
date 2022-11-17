const validationCheck = (type, value, required) => {
  let regExp = null;
  let errorMessage = '';

  if (required && value.length <= 0)
    return { test: false, errorMessage: message.user.required };

  switch (type) {
    case 'nickName':
      regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,20}$/;
      errorMessage = message.user.nickName;
      return { test: regExp.test(value), errorMessage };
    case 'email':
      regExp =
        /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;
      errorMessage = message.user.email;
      return { test: regExp.test(value), errorMessage };
    case 'password':
      regExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      errorMessage = message.user.password;
      return { test: regExp.test(value), errorMessage };
    default:
      return { test: true, errorMessage };
  }
};

const message = {
  user: {
    required: '필수 정보입니다.',
    nickName: '3~20자의 한글, 영문, 숫자만 사용 가능합니다.',
    email: '이메일 주소를 다시 확인해주세요.',
    password: '8~16자 영문, 숫자, 특수문자(@$!%*?&)를 사용하세요.',
  },
};

export { validationCheck };
