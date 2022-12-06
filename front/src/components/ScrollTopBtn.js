import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollTopBtnContainer = styled.div`
  &.hide {
    display: none;
  }
  z-index: 5050;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 50%;
  display: flex;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
    right: 15px;
    bottom: 15px;
  }
`;

const ScrollTopBtn = () => {
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 100) setBtnStatus(true);
    else setBtnStatus(false);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <ScrollTopBtnContainer
      onClick={handleTop}
      className={btnStatus ? 'show' : 'hide'}
    >
      <img
        src={process.env.PUBLIC_URL + '/images/top_arrow_icon.svg'}
        alt="top"
      />
    </ScrollTopBtnContainer>
  );
};

export default ScrollTopBtn;
