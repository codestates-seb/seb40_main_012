import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasicButton } from '../../components/Buttons';

const CollectionHeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectionInfo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const CollectionWriteBtn = styled(BasicButton)`
  &:hover {
    cursor: pointer;
  }
`;

const CollectionHeader = () => {
  return (
    <CollectionHeaderContainer>
      <CollectionInfo>
        당신만을 위한 <span>Cherry Pick</span> 컬렉션
      </CollectionInfo>
      <Link to="/collection/write">
        <CollectionWriteBtn width="90px" height="30px" fontSize="12px">
          컬렉션 만들기
        </CollectionWriteBtn>
      </Link>
    </CollectionHeaderContainer>
  );
};

export default CollectionHeader;
