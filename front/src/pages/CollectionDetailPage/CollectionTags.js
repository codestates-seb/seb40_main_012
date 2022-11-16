import styled from 'styled-components';
import { Tag } from '../../components/tag';

const CollectionTagsContainer = styled.div`
  display: flex;
  padding: 15px 0 25px 0;
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
