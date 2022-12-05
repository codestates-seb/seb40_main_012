import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchKeyword,
  selectSearchKeyword,
  setSearchMode,
} from 'store/modules/searchSlice';

const SearchbarContainer = styled(Box)`
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 3px;
  display: flex;
  margin-right: 10px;
`;

const SearchIconContainer = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchbarInput = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Searchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keyword = useSelector(selectSearchKeyword);

  const handleChangeInput = (e) => {
    dispatch(setSearchKeyword({ keyword: e.target.value }));
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(setSearchMode({ mode: true }));
      //dispatch(setSearchKeyword({ keyword: input }));
      navigate(`/search/book/${keyword}`);
    }
  };

  return (
    <SearchbarContainer sx={{ width: { xs: '100%', sm: '300px' } }}>
      <SearchIconContainer>
        <img
          src={process.env.PUBLIC_URL + '/images/Search_Icon.svg'}
          alt="Search Icon"
        />
      </SearchIconContainer>
      <SearchbarInput
        type="text"
        placeholder="책, 페어링, 컬렉션을 검색해보세요"
        onChange={handleChangeInput}
        onKeyPress={handleOnKeyPressEnter}
        value={keyword}
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
