import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyword: (state, { payload }) => {
      state.keyword = payload.keyword;
    },
  },
});

export const { setSearchKeyword } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchKeyword = (state) => state.search.keyword;
