import styled from 'styled-components';

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

const LikeButton = ({ isLiked, LikePlus, LikeMinus, children }) => {
  const setFilledHeart = () => {
    LikePlus();
  };
  const setUnfilledHeart = () => {
    LikeMinus();
  };
  return (
    <div>
      {isLiked ? (
        <Btns onClick={setUnfilledHeart}>
          <img
            src={process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'}
            alt="heart icon"
          />
          <span>{children}</span>
        </Btns>
      ) : (
        <Btns onClick={setFilledHeart}>
          <img
            src={process.env.PUBLIC_URL + '/images/p_heart_unfilled_icon.svg'}
            alt="heart icon"
          />
          <span>{children}</span>
        </Btns>
      )}
    </div>
  );
};

export default LikeButton;
