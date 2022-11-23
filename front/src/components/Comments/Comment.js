import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToDateString } from '../../util/ToDateString';

const CommentContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  &.mine {
    background-color: #f5f5f5;
  }
`;

const UserImgContainer = styled.div`
  margin: 3px 12px 0 0;
  img {
    width: 25px;
    height: 25px;
  }
`;

const CommentBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const BodyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.btns {
    margin-top: 8px;
  }
  .edit {
    display: flex;
    margin-top: 3px;
  }
  div.hide {
    visibility: hidden;
  }
  .content {
    display: flex;
    width: 100%;
    margin: 3px 8px 0 0;
  }
`;

const UserNickname = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  &.my {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
const CreatedAt = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;
const CommentContent = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.darkgray};
  word-break: break-all;
`;
const CommentEditInput = styled.textarea`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.dark};
  word-break: break-all;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  font-family: RobotoInCjk, 'Noto Sans KR', 'Apple SD Gothic Neo',
    'Nanum Gothic', 'Malgun Gothic', sans-serif;
  &:focus {
    outline: none;
  }
`;
const LikeBtn = styled.div`
  display: flex;
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    path {
      fill: ${({ theme }) => theme.colors.gray};
    }
    &:hover {
      cursor: pointer;
      path {
        fill: ${({ theme }) => theme.colors.mainColor};
      }
    }
  }
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray};
`;
const DeleteBtn = styled.div`
  svg {
    width: 18px;
    height: 18px;
    path {
      fill: ${({ theme }) => theme.colors.gray};
    }
    &:hover {
      cursor: pointer;
      path {
        fill: ${({ theme }) => theme.colors.mainColor};
      }
    }
  }
  &.notmine {
    display: none;
  }
`;
const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
const CheckBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

//TODO: 본인이 작성한 코멘트만 삭제 버튼 활성화되도록
const Comment = ({
  data,
  commentId,
  commentDelete,
  userEmail,
  commentEdit,
  commentLike,
}) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(data.body);

  useEffect(() => {
    setIsMyComment(userEmail === data.userInformation.email);
  }, []);

  const handleDeleteComment = () => {
    if (isMyComment) commentDelete(commentId);
  };

  const handleClickEditBtn = () => setIsEditMode(true);
  const handleClickCheckBtn = () => {
    setIsEditMode(false);
    if (editContent.length >= 5) {
      commentEdit(commentId, editContent);
    } else {
      setEditContent(data.body);
    }
  };

  const handleOnChangeEditContent = (e) => setEditContent(e.target.value);

  const handleOnClickLikeBtn = () => {
    commentLike(commentId);
  };

  return (
    <CommentContainer className={isMyComment ? 'mine' : null}>
      <UserImgContainer>
        <img
          src={process.env.PUBLIC_URL + '/images/mypage_icon.svg'}
          alt="user icon"
        />
      </UserImgContainer>
      <CommentBodyContainer>
        <BodyContainer>
          <UserNickname className={isMyComment ? 'my' : null}>
            {data.userInformation.nickName}
          </UserNickname>
          <CreatedAt>{ToDateString(data.createdAt)}</CreatedAt>
        </BodyContainer>
        <BodyContainer>
          <div className="content">
            {isEditMode ? (
              <CommentEditInput
                value={editContent}
                onChange={handleOnChangeEditContent}
              ></CommentEditInput>
            ) : (
              <CommentContent>{data.body}</CommentContent>
            )}
          </div>
          <div className={`edit ${isMyComment ? 'show' : 'hide'}`}>
            {isEditMode ? (
              <CheckBtn onClick={handleClickCheckBtn}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8.33268 11.3333L13.2493 6.41667C13.4021 6.26389 13.5966 6.1875 13.8327 6.1875C14.0688 6.1875 14.2632 6.26389 14.416 6.41667C14.5688 6.56944 14.6452 6.76389 14.6452 7C14.6452 7.23611 14.5688 7.43056 14.416 7.58333L8.91602 13.0833C8.74935 13.25 8.5549 13.3333 8.33268 13.3333C8.11046 13.3333 7.91602 13.25 7.74935 13.0833L5.58268 10.9167C5.4299 10.7639 5.35352 10.5694 5.35352 10.3333C5.35352 10.0972 5.4299 9.90278 5.58268 9.75C5.73546 9.59722 5.9299 9.52083 6.16602 9.52083C6.40213 9.52083 6.59657 9.59722 6.74935 9.75L8.33268 11.3333Z"
                    fill="#737373"
                  />
                </svg>
              </CheckBtn>
            ) : (
              <EditBtn onClick={handleClickEditBtn}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16667 15.8333H5.33333L12.5208 8.64579L11.3542 7.47913L4.16667 14.6666V15.8333ZM16.0833 7.43746L12.5417 3.93746L13.7083 2.77079C14.0278 2.45135 14.4203 2.29163 14.8858 2.29163C15.3508 2.29163 15.7431 2.45135 16.0625 2.77079L17.2292 3.93746C17.5486 4.2569 17.7153 4.64246 17.7292 5.09413C17.7431 5.54524 17.5903 5.93051 17.2708 6.24996L16.0833 7.43746ZM14.875 8.66663L6.04167 17.5H2.5V13.9583L11.3333 5.12496L14.875 8.66663ZM11.9375 8.06246L11.3542 7.47913L12.5208 8.64579L11.9375 8.06246Z"
                    fill="#737373"
                  />
                </svg>
              </EditBtn>
            )}
          </div>
        </BodyContainer>
        <BodyContainer className="btns">
          <LikeBtn onClick={handleOnClickLikeBtn}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6284 13.0298C22.0386 12.4878 22.2656 11.8237 22.2656 11.1328C22.2656 10.0366 21.6528 8.99904 20.6665 8.42043C20.4126 8.27149 20.1235 8.1931 19.8291 8.19338H13.9746L14.1211 5.19289C14.1553 4.46779 13.8989 3.77931 13.4009 3.25441C13.1565 2.99569 12.8616 2.78984 12.5345 2.64959C12.2073 2.50934 11.8549 2.43766 11.499 2.43898C10.2295 2.43898 9.10645 3.29348 8.76953 4.51662L6.67236 12.1094H3.51562C3.0835 12.1094 2.73438 12.4585 2.73438 12.8906V21.7774C2.73438 22.2095 3.0835 22.5586 3.51562 22.5586H18.1958C18.4204 22.5586 18.6401 22.5147 18.8428 22.4268C20.0049 21.9312 20.7544 20.7959 20.7544 19.5362C20.7544 19.2285 20.7104 18.9258 20.6226 18.6328C21.0327 18.0908 21.2598 17.4268 21.2598 16.7359C21.2598 16.4282 21.2158 16.1255 21.1279 15.8325C21.5381 15.2905 21.7651 14.6265 21.7651 13.9356C21.7603 13.6279 21.7163 13.3228 21.6284 13.0298V13.0298ZM4.49219 20.8008V13.8672H6.46973V20.8008H4.49219ZM20.0293 12.1826L19.4946 12.6465L19.834 13.2666C19.9458 13.4709 20.0038 13.7003 20.0024 13.9331C20.0024 14.336 19.8267 14.7193 19.5239 14.9829L18.9893 15.4468L19.3286 16.0669C19.4404 16.2712 19.4984 16.5006 19.4971 16.7334C19.4971 17.1362 19.3213 17.5195 19.0186 17.7832L18.4839 18.2471L18.8232 18.8672C18.935 19.0715 18.993 19.3008 18.9917 19.5337C18.9917 20.0806 18.6694 20.5737 18.1714 20.7984H8.03223V13.7891L10.4614 4.98781C10.5241 4.76223 10.6585 4.56321 10.8444 4.42091C11.0304 4.27861 11.2576 4.20079 11.4917 4.19924C11.6772 4.19924 11.8604 4.25295 12.0068 4.36281C12.2485 4.54347 12.3779 4.81691 12.3633 5.10744L12.1289 9.95119H19.8047C20.2393 10.2173 20.5078 10.6665 20.5078 11.1328C20.5078 11.5357 20.332 11.9165 20.0293 12.1826Z"
                fill="#232627"
              />
            </svg>
            <div>{data.likeCount}</div>
          </LikeBtn>
          <DeleteBtn
            className={isMyComment ? null : 'notmine'}
            onClick={handleDeleteComment}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16663C9.16667 8.94561 9.07887 8.73365 8.92259 8.57737C8.76631 8.42109 8.55435 8.33329 8.33333 8.33329C8.11232 8.33329 7.90036 8.42109 7.74408 8.57737C7.5878 8.73365 7.5 8.94561 7.5 9.16663V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15ZM16.6667 4.99996H13.3333V4.16663C13.3333 3.50358 13.0699 2.8677 12.6011 2.39886C12.1323 1.93002 11.4964 1.66663 10.8333 1.66663H9.16667C8.50363 1.66663 7.86774 1.93002 7.3989 2.39886C6.93006 2.8677 6.66667 3.50358 6.66667 4.16663V4.99996H3.33333C3.11232 4.99996 2.90036 5.08776 2.74408 5.24404C2.5878 5.40032 2.5 5.61228 2.5 5.83329C2.5 6.05431 2.5878 6.26627 2.74408 6.42255C2.90036 6.57883 3.11232 6.66663 3.33333 6.66663H4.16667V15.8333C4.16667 16.4963 4.43006 17.1322 4.8989 17.6011C5.36774 18.0699 6.00363 18.3333 6.66667 18.3333H13.3333C13.9964 18.3333 14.6323 18.0699 15.1011 17.6011C15.5699 17.1322 15.8333 16.4963 15.8333 15.8333V6.66663H16.6667C16.8877 6.66663 17.0996 6.57883 17.2559 6.42255C17.4122 6.26627 17.5 6.05431 17.5 5.83329C17.5 5.61228 17.4122 5.40032 17.2559 5.24404C17.0996 5.08776 16.8877 4.99996 16.6667 4.99996ZM8.33333 4.16663C8.33333 3.94561 8.42113 3.73365 8.57741 3.57737C8.73369 3.42109 8.94565 3.33329 9.16667 3.33329H10.8333C11.0543 3.33329 11.2663 3.42109 11.4226 3.57737C11.5789 3.73365 11.6667 3.94561 11.6667 4.16663V4.99996H8.33333V4.16663ZM14.1667 15.8333C14.1667 16.0543 14.0789 16.2663 13.9226 16.4225C13.7663 16.5788 13.5543 16.6666 13.3333 16.6666H6.66667C6.44565 16.6666 6.23369 16.5788 6.07741 16.4225C5.92113 16.2663 5.83333 16.0543 5.83333 15.8333V6.66663H14.1667V15.8333ZM11.6667 15C11.8877 15 12.0996 14.9122 12.2559 14.7559C12.4122 14.5996 12.5 14.3876 12.5 14.1666V9.16663C12.5 8.94561 12.4122 8.73365 12.2559 8.57737C12.0996 8.42109 11.8877 8.33329 11.6667 8.33329C11.4457 8.33329 11.2337 8.42109 11.0774 8.57737C10.9211 8.73365 10.8333 8.94561 10.8333 9.16663V14.1666C10.8333 14.3876 10.9211 14.5996 11.0774 14.7559C11.2337 14.9122 11.4457 15 11.6667 15Z"
                fill="#232627"
              />
            </svg>
          </DeleteBtn>
        </BodyContainer>
      </CommentBodyContainer>
    </CommentContainer>
  );
};

export default Comment;
