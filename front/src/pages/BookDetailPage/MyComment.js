import styled from 'styled-components';
import { ToDateString } from '../../util/ToDateString';
import axios from '../../api/axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 5px;
`;

const MyRatingStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 5px;
`;

const MyCommentStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.purple_2};
  border-radius: 5px;
  margin: 10px 0px;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
  .bold {
    font-weight: bold;
  }
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

const MyComment = ({
  isbn,
  getBookData,
  myRating,
  myComment,
  commentId,
  handleCommentDelete,
}) => {
  return (
    <Wrapper>
      <MyRatingStyled>
        {myRating === 0 ? null : (
          <div>
            <RowBox>
              <div className="bold">나의 별점</div>
              <div></div>
            </RowBox>
            <RowBox>
              <div>★ {myRating}</div>
              <DeleteBtn
                onClick={() => {
                  axios
                    .patch(`/api/books/${isbn}/rating`, { rating: 0 })
                    .then(() => {
                      getBookData();
                    });
                }}
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
            </RowBox>
          </div>
        )}
      </MyRatingStyled>
      <MyCommentStyled>
        {myComment?.body ? (
          <div>
            <RowBox>
              <div className="bold">나의 코멘트</div>
              <div>{ToDateString(myComment?.modifiedAt)}</div>
            </RowBox>
            <RowBox>
              <div>{myComment?.body}</div>
              <DeleteBtn
                onClick={() => {
                  handleCommentDelete(commentId);
                }}
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
            </RowBox>
          </div>
        ) : null}
      </MyCommentStyled>
    </Wrapper>
  );
};

export default MyComment;