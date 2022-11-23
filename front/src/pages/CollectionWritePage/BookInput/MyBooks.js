import { useState } from 'react';
import styled from 'styled-components';
import NewBook from './NewBook';

const MyBooksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const MyBooksTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  display: flex;
`;

const Books = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 15px 10px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  &.hide {
    display: none;
  }
`;

const MyBooksBtn = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const HideBtn = styled(MyBooksBtn)``;

const ShowBtn = styled(MyBooksBtn)``;

const MyBooks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MyBooksContainer>
      <MyBooksTitle>
        <div>내가 북마크한 책</div>
        {isOpen ? (
          <HideBtn onClick={() => setIsOpen(false)}>
            <svg width="27" height="27" viewBox="0 0 20 20" fill="none">
              <path
                d="M5.58268 12.25C5.4299 12.0972 5.35352 11.9028 5.35352 11.6666C5.35352 11.4305 5.4299 11.2361 5.58268 11.0833L9.41602 7.24998C9.49935 7.16665 9.58963 7.10748 9.68685 7.07248C9.78407 7.03804 9.88824 7.02081 9.99935 7.02081C10.1105 7.02081 10.2182 7.04165 10.3227 7.08331C10.4266 7.12498 10.5132 7.18053 10.5827 7.24998L14.416 11.0833C14.5688 11.2361 14.6452 11.4305 14.6452 11.6666C14.6452 11.9028 14.5688 12.0972 14.416 12.25C14.2632 12.4028 14.0688 12.4791 13.8327 12.4791C13.5966 12.4791 13.4021 12.4028 13.2493 12.25L9.99935 8.99998L6.74935 12.25C6.59657 12.4028 6.40213 12.4791 6.16602 12.4791C5.9299 12.4791 5.73546 12.4028 5.58268 12.25V12.25Z"
                fill="#232627"
              />
            </svg>
          </HideBtn>
        ) : (
          <ShowBtn onClick={() => setIsOpen(true)}>
            <svg width="27" height="27" viewBox="0 0 20 20" fill="none">
              <path
                d="M9.99935 12.4791C9.88824 12.4791 9.78074 12.4583 9.67685 12.4166C9.5724 12.375 9.48546 12.3194 9.41602 12.25L5.58268 8.41665C5.4299 8.26387 5.35352 8.06942 5.35352 7.83331C5.35352 7.5972 5.4299 7.40276 5.58268 7.24998C5.73546 7.0972 5.9299 7.02081 6.16602 7.02081C6.40213 7.02081 6.59657 7.0972 6.74935 7.24998L9.99935 10.5L13.2493 7.24998C13.4021 7.0972 13.5966 7.02081 13.8327 7.02081C14.0688 7.02081 14.2632 7.0972 14.416 7.24998C14.5688 7.40276 14.6452 7.5972 14.6452 7.83331C14.6452 8.06942 14.5688 8.26387 14.416 8.41665L10.5827 12.25C10.4993 12.3333 10.4091 12.3922 10.3118 12.4266C10.2146 12.4616 10.1105 12.4791 9.99935 12.4791V12.4791Z"
                fill="#232627"
              />
            </svg>
          </ShowBtn>
        )}
      </MyBooksTitle>
      <Books className={isOpen ? 'open' : 'hide'}>
        <NewBook />
        <NewBook />
        <NewBook />
        <NewBook />
        <NewBook />
        <NewBook />
        <NewBook />
      </Books>
    </MyBooksContainer>
  );
};

export default MyBooks;
