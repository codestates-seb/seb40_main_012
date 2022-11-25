import styled from 'styled-components';

const CollectionDetailHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CollectionTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  margin: 30px 0 10px 0;
`;

const CollectionWriter = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  display: flex;
  align-items: center;
`;

const CollectionUpdate = styled.div`
  margin: 5px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
`;

const CollectionDetailHeader = ({ title, writer, update }) => {
  return (
    <CollectionDetailHeaderContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionWriter>
        <img
          src={process.env.PUBLIC_URL + '/images/Mypage_Icon.svg'}
          alt="User Profile"
        />
        {writer}
      </CollectionWriter>
      <CollectionUpdate>마지막 업데이트 {update}</CollectionUpdate>
    </CollectionDetailHeaderContainer>
  );
};

export default CollectionDetailHeader;
