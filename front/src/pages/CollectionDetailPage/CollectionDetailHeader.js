import styled from 'styled-components';
import CollectionTags from './CollectionTags';

const CollectionDetailHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  @media screen and (max-width: 500px) {
    padding: 0 5px;
  }
`;

const CollectionTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  margin: 30px 0 10px 0;
  @media screen and (max-width: 640px) {
    font-size: 24px;
    margin: 20px 0 5px 0;
  }
  @media screen and (max-width: 500px) {
    font-size: 20px;
    margin-top: 10px;
  }
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
  @media screen and (max-width: 500px) {
    font-size: 10px;
    img {
      width: 15px;
      height: 15px;
    }
  }
`;

const CollectionUpdate = styled.div`
  margin: 5px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const TitleTagContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media screen and (max-width: 500px) {
  }
`;

const CollectionDetailHeader = ({ title, writer, update, taglist }) => {
  return (
    <CollectionDetailHeaderContainer>
      <TitleTagContainer>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionTags taglist={taglist} />
      </TitleTagContainer>
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
