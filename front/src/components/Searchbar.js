import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from 'store/modules/searchSlice';

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
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(setSearchKeyword({ keyword: input }));
      navigate(`/search/book/${input}`);
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
        placeholder="책, 컬렉션을 검색해보세요"
        onChange={handleChangeInput}
        onKeyPress={handleOnKeyPressEnter}
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
