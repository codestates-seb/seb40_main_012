import styled from 'styled-components';
import { Tag } from '../../components/tag';

const CollectionTagsContainer = styled.div`
  display: flex;
  margin: 20px 0 0 20px;
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
