import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CollectionSetTitleContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const CollectionTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
  span.nickName {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const MyCollectionBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  img {
    width: 18px;
    height: 18px;
    margin: 0 0 2px 3px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const CollectionSetTitle = ({
  title,
  type = 'basic',
  nickName = '',
  isLogin = false,
}) => {
  const navigate = useNavigate();

  const onClickMyCollectionBtn = () => {
    navigate('/mypage/mycollection');
  };

  return (
    <CollectionSetTitleContainer>
      {type === 'recommend' ? (
        <CollectionTitle>
          <span className="nickName">{nickName}</span>
          <span>님의 취향에 맞는 추천 컬렉션</span>
        </CollectionTitle>
      ) : (
        <CollectionTitle>{title}</CollectionTitle>
      )}
      {isLogin ? (
        <MyCollectionBtn onClick={onClickMyCollectionBtn}>
          모두보기
          <img
            src={process.env.PUBLIC_URL + '/images/right_arrow_icon.svg'}
            alt="to mypage"
          />
        </MyCollectionBtn>
      ) : null}
    </CollectionSetTitleContainer>
  );
};

export default CollectionSetTitle;
