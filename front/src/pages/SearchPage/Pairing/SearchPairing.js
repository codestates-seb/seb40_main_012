import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchPairingContainer = styled.div`
  width: 25%;
  padding: 10px;
  @media screen and (max-width: 640px) {
    width: 33%;
    padding: 7px;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
    padding: 10px;
  }
`;

const PairingCoverContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const PairingTitleContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 3px 3px 3px rgba(109, 109, 109, 0.3);
  padding: 0 5px;
  font-weight: 600;
  @media screen and (max-width: 980px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const PairingInfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  @media screen and (max-width: 640px) {
    margin-top: 5px;
  }
  .like,
  .comment {
    display: flex;
    align-items: center;
    margin-right: 10px;
    @media screen and (max-width: 640px) {
      font-size: 14px;
    }
    @media screen and (max-width: 500px) {
      font-size: 13px;
    }
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 3px;
    @media screen and (max-width: 640px) {
      width: 15px;
    }
  }
`;

const SearchPairing = ({ pairingId, title, img, like, comment }) => {
  const navigate = useNavigate();

  return (
    <SearchPairingContainer>
      <PairingCoverContainer
        img={img}
        color={img ? null : '#A28BFF'}
        onClick={() => navigate(`/pairing/${pairingId}`)}
      >
        <PairingTitleContainer>{title}</PairingTitleContainer>
      </PairingCoverContainer>
      <PairingInfoContainer>
        <div className="like">
          <img
            src={process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'}
            alt="like"
          />
          {like}
        </div>
        <div className="comment">
          <img
            src={process.env.PUBLIC_URL + '/images/comment_icon.svg'}
            alt="comment"
          />
          {comment.length}
        </div>
      </PairingInfoContainer>
    </SearchPairingContainer>
  );
};

export default SearchPairing;
