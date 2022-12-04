import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/modules/authSlice';
import styled from 'styled-components';

const CommentAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  div.input {
    display: flex;
  }
  margin-bottom: 50px;
  @media screen and (max-width: 640px) {
    padding: 10px 0;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 6px;
  padding: 0 10px;
  &:focus {
    outline: none;
  }
  margin-right: 20px;
  @media screen and (max-width: 640px) {
    margin-right: 10px;
  }
  @media screen and (max-width: 500px) {
    height: 30px;
    font-size: 10px;
    padding: 0 5px;
    margin-right: 5px;
  }
`;

const CommentAddBtn = styled.button`
  width: 80px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 500px) {
    width: 60px;
    font-size: 12px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
  &:hover {
    cursor: pointer;
  }
  div {
    white-space: nowrap;
    margin-left: 5px;
  }
  &.able {
    color: ${({ theme }) => theme.colors.mainColor};
    path {
      fill: ${({ theme }) => theme.colors.mainColor};
    }
    background-color: ${({ theme }) => theme.colors.purple_3};
    &:hover {
      background-color: ${({ theme }) => theme.colors.purple_2};
    }
  }
`;

const CommentInfoContainer = styled.div`
  font-size: 13px;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.gray};
  &.none {
    display: none;
  }
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const CommentAdd = ({ commentAdd }) => {
  const [isAbleAdd, setIsAbleAdd] = useState(false);
  const [input, setInput] = useState('');

  const isLogin = useSelector(selectIsLogin);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (isLogin && input.length >= 5) setIsAbleAdd(true);
    else setIsAbleAdd(false);
  };

  const handleCommentAdd = () => {
    if (isAbleAdd) {
      commentAdd(input);
      setInput('');
      setIsAbleAdd(false);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommentAdd();
    }
  };

  return (
    <CommentAddContainer>
      <div className="input">
        <CommentInput
          type="text"
          placeholder="댓글을 남겨보세요."
          onChange={handleInputChange}
          onKeyPress={handleOnKeyPress}
          value={input}
          maxLength="1000"
        />
        <CommentAddBtn
          className={isAbleAdd ? 'able' : ''}
          onClick={handleCommentAdd}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5007 2.08325C11.1328 2.08325 9.77824 2.35269 8.51443 2.87617C7.25062 3.39966 6.1023 4.16695 5.13502 5.13422C3.18152 7.08773 2.08405 9.73725 2.08405 12.4999C2.07494 14.9053 2.90779 17.238 4.43822 19.0937L2.35488 21.177C2.21034 21.3235 2.11243 21.5095 2.0735 21.7116C2.03457 21.9136 2.05636 22.1227 2.13613 22.3124C2.22265 22.4998 2.36291 22.6573 2.5391 22.7649C2.71529 22.8725 2.91947 22.9253 3.12571 22.9166H12.5007C15.2634 22.9166 17.9129 21.8191 19.8664 19.8656C21.8199 17.9121 22.9174 15.2626 22.9174 12.4999C22.9174 9.73725 21.8199 7.08773 19.8664 5.13422C17.9129 3.18072 15.2634 2.08325 12.5007 2.08325V2.08325ZM12.5007 20.8333H5.63613L6.60488 19.8645C6.79889 19.6693 6.90779 19.4053 6.90779 19.1301C6.90779 18.8549 6.79889 18.5909 6.60488 18.3958C5.24091 17.0333 4.39152 15.2401 4.20143 13.3216C4.01135 11.4031 4.49232 9.47805 5.56241 7.87442C6.6325 6.27079 8.2255 5.08779 10.07 4.52697C11.9145 3.96616 13.8964 4.06222 15.678 4.79879C17.4596 5.53536 18.9308 6.86687 19.8408 8.56647C20.7507 10.2661 21.0433 12.2286 20.6686 14.1197C20.2938 16.0108 19.275 17.7135 17.7857 18.9377C16.2963 20.1618 14.4286 20.8317 12.5007 20.8333V20.8333Z"
              fill="#232627"
            />
          </svg>
          <div>등록</div>
        </CommentAddBtn>
      </div>
      <div>
        <CommentInfoContainer className={isAbleAdd ? 'none' : ''}>
          5글자 이상 입력하세요.
        </CommentInfoContainer>
      </div>
    </CommentAddContainer>
  );
};

export default CommentAdd;
