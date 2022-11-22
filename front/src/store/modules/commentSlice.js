import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { COMMENT_URL } from '../../api/requests';

const initialState = {
  data: [],
  status: '',
};

export const asyncGetMyCommentList = createAsyncThunk(
  'myPage/getMyCommentList',
  async () => {
    return await axios.get(COMMENT_URL).then((res) => res.data);
    // res.data.data.content
  }
);

export const myCommentListSlice = createSlice({
  name: 'getMyComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetMyCommentList.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetMyCommentList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(asyncGetMyCommentList.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default myCommentListSlice.reducer;
