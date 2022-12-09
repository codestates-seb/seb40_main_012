import styled from 'styled-components';
import { Tag } from '../../components/tag';

const CollectionTagsContainer = styled.div`
  display: flex;
  margin: 20px 0 0 20px;
  @media screen and (max-width: 640px) {
    margin: 0 0 10px 0;
  }
  @media screen and (max-width: 500px) {
  }
`;

const CollectionTags = ({ taglist }) => {
  return (
    <CollectionTagsContainer>
      {taglist.map((tag, idx) => {
        return <Tag key={idx}>#{tag}</Tag>;
      })}
    </CollectionTagsContainer>
  );
};

export default CollectionTags;
