import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CollectionWriteBtnsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const ExitBtn = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.dark};
  background-color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding-top: 2px;
    margin-left: 3px;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const CollectionWriteBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: white;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.purple_1};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WarningMsg = styled.div`
  padding: 0 10px;
  font-size: 13px;
  display: flex;
  div {
    background-color: #ffc5c5;
    padding: 8px;
    font-weight: 700;
    color: #850000;
    border-radius: 3px;
  }
  &.hide {
    div {
      visibility: hidden;
      opacity: 0;
      transition: ease-in-out 300ms;
    }
  }
  &.show {
    div {
      visibility: visible;
      opacity: 1;
      transition: ease-in-out 300ms;
    }
  }
`;

const InputWaringMsg = styled.div`
  width: 100%;
  font-weight: 600;
  text-align: end;
  margin-bottom: 12px;
  color: #850000;
  &.hide {
    display: none;
  }
`;

const CollectionWriteBtns = ({
  handleCollectionWrite,
  isFilled,
  type = 'write',
}) => {
  const [isHoverExit, setIsHoverExit] = useState(false);

  const handleFocusExit = () => setIsHoverExit(true);
  const handleBlurExit = () => setIsHoverExit(false);

  return (
    <CollectionWriteBtnsContainer>
      <InputWaringMsg className={isFilled ? 'hide' : 'show'}>
        제목과 새로운 컬렉션의 책이 필요합니다
      </InputWaringMsg>
      <Buttons>
        <ExitBtn
          onFocus={handleFocusExit}
          onMouseOver={handleFocusExit}
          onMouseLeave={handleBlurExit}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/exit_icon.svg'}
            alt="exit"
          />
          <Link to="/collection">
            <div>나가기</div>
          </Link>
        </ExitBtn>
        <CollectionWriteBtn onClick={handleCollectionWrite}>
          {type === 'write' ? `생성하기` : `수정완료`}
        </CollectionWriteBtn>
      </Buttons>
      <WarningMsg className={isHoverExit ? 'show' : 'hide'}>
        <div>
          {type === 'write'
            ? `작성 중이던 컬렉션이 사라집니다`
            : `수정 중이던 컬렉션이 저장되지 않습니다`}
        </div>
      </WarningMsg>
    </CollectionWriteBtnsContainer>
  );
};

export default CollectionWriteBtns;
