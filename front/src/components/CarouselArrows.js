import styled from 'styled-components';

const ArrowContainer = styled.div`
  width: 25px;
  height: 25px;
`;
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img
        src={process.env.PUBLIC_URL + '/images/carousel_next_icon.svg'}
        alt="carousel next"
      />
    </ArrowContainer>
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img
        src={process.env.PUBLIC_URL + '/images/carousel_prev_icon.svg'}
        alt="carousel next"
      />
    </ArrowContainer>
  );
};

export { NextArrow, PrevArrow };
