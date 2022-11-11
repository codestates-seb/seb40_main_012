import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchbarContainer = styled.div`
  width: 400px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 3px;
  display: flex;
`;

const SearchInconContainer = styled.div`
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
`;

export const Searchbar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${input}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchbarContainer>
        <SearchInconContainer>
          <img
            src={process.env.PUBLIC_URL + '/images/Search_Icon.svg'}
            alt="Search Icon"
          />
        </SearchInconContainer>
        <SearchbarInput
          type="text"
          placeholder="책, 페어링, 컬렉션을 검색해보세요"
          onChange={handleChangeInput}
          onKeyPress={handleOnKeyPressEnter}
        />
      </SearchbarContainer>
    </ThemeProvider>
  );
};

export default Searchbar;
