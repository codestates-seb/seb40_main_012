import styled from 'styled-components';
import { BasicButton } from '../../components/Buttons';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/modules/authSlice';
import NeedLoginModal from 'pages/PairingPage/PairingDetail/NeedLoginModal';
import { Link } from 'react-router-dom';

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
  const isLogin = useSelector(selectIsLogin);

  return (
    <CollectionHeaderContainer>
      <CollectionInfo>
        당신만을 위한 <span>Cherry Pick</span> 컬렉션
      </CollectionInfo>
      {isLogin ? (
        <Link to="/collection/write">
          <CollectionWriteBtn width="90px" height="30px" fontSize="12px">
            컬렉션 만들기
          </CollectionWriteBtn>
        </Link>
      ) : (
        <NeedLoginModal>
          <CollectionWriteBtn width="90px" height="30px" fontSize="12px">
            컬렉션 만들기
          </CollectionWriteBtn>
        </NeedLoginModal>
      )}
    </CollectionHeaderContainer>
  );
};

export default CollectionHeader;
