import styled from 'styled-components';

const CollectionTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CollectionTag = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 2px 8px;
  margin: 0 3px;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 13px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const CollectionTags = ({ tagList }) => {
  return (
    <CollectionTagsContainer>
      {tagList.map((tag, idx) => {
        return <CollectionTag key={idx}>#{tag}</CollectionTag>;
      })}
    </CollectionTagsContainer>
  );
};

export default CollectionTags;
