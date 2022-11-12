import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchbarContainer = styled.div`
  width: 300px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 3px;
  display: flex;
  position: absolute;
  right: 180px;
  @media screen and (max-width: 981px) {
    width: 30%;
  }
  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const SearchIconContainer = styled.div`
  margin: 0 12px 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 981px) {
    display: flex;
    min-width: 200px;
  }
`;

export const Searchbar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${input}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchbarContainer>
        <SearchIconContainer>
          <img
            src={process.env.PUBLIC_URL + '/images/Search_Icon.svg'}
            alt="Search Icon"
          />
        </SearchIconContainer>
        <SearchbarInput
          type="text"
          placeholder="책, 컬렉션, 페어링을 검색해보세요"
          onChange={handleChangeInput}
          onKeyPress={handleOnKeyPressEnter}
        />
      </SearchbarContainer>
    </ThemeProvider>
  );
};

export default Searchbar;
