import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  mode: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyword: (state, { payload }) => {
      state.keyword = payload.keyword;
    },
    setSearchMode: (state, { payload }) => {
      state.mode = payload.mode;
    },
  },
});

export const { setSearchKeyword, setSearchMode } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchKeyword = (state) => state.search.keyword;
export const selectSearchMode = (state) => state.search.mode;
