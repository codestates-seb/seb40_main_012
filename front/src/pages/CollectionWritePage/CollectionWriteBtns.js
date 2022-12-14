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
  @media screen and (max-width: 500px) {
    font-size: 12px;
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
  @media screen and (max-width: 500px) {
    font-size: 12px;
    width: 80px;
    height: 30px;
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
  @media screen and (max-width: 500px) {
    font-size: 12px;
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
        ????????? ????????? ???????????? ?????? ???????????????
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
            <div>?????????</div>
          </Link>
        </ExitBtn>
        <CollectionWriteBtn onClick={handleCollectionWrite}>
          {type === 'write' ? `????????????` : `????????????`}
        </CollectionWriteBtn>
      </Buttons>
      <WarningMsg className={isHoverExit ? 'show' : 'hide'}>
        <div>
          {type === 'write'
            ? `?????? ????????? ???????????? ???????????????`
            : `?????? ????????? ???????????? ???????????? ????????????`}
        </div>
      </WarningMsg>
    </CollectionWriteBtnsContainer>
  );
};

export default CollectionWriteBtns;
