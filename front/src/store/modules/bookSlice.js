import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { BOOKS_URL } from '../../api/requests';

const initialState = {
  data: {
    comments: [],
  },
  status: 'start',
};

export const getBookAsync = createAsyncThunk(
  'bookSlice/getBookAsync',
  async (isbn) => {
    return await axios.get(`${BOOKS_URL}/${isbn}`).then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
  }
);

export const bookSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookAsync.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getBookAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getBookAsync.rejected, (state) => {
      state.data = [];
      state.status = 'rejected';
    });
  },
});

export default bookSlice.reducer;
