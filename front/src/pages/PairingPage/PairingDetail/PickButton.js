import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../../store/modules/authSlice';
import NeedLoginModal from './NeedLoginModal';

const Btns = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

const PickButton = ({ isBookmarked, handleBookmark }) => {
  const isLogin = useSelector(selectIsLogin);

  const handlePick = () => {
    handleBookmark();
  };
  return (
    <div>
      {isLogin ? (
        <div>
          {isBookmarked ? (
            <Btns onClick={handlePick}>
              <img
                src={
                  process.env.PUBLIC_URL + '/images/bookmark_filled_icon.svg'
                }
                alt="bookmark icon"
              />
              <span>나의 픽</span>
            </Btns>
          ) : (
            <Btns onClick={handlePick}>
              <img
                src={
                  process.env.PUBLIC_URL + '/images/bookmark_unfilled_icon.svg'
                }
                alt="bookmark icon"
              />
              <span>나의 픽</span>
            </Btns>
          )}
        </div>
      ) : (
        <NeedLoginModal>
          <Btns>
            <img
              src={
                process.env.PUBLIC_URL + '/images/bookmark_unfilled_icon.svg'
              }
              alt="bookmark icon"
            />
            <span>나의 픽</span>
          </Btns>
        </NeedLoginModal>
      )}
    </div>
  );
};

export default PickButton;
