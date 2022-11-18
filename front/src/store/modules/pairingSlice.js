import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { PAIRING_URL } from '../../api/requests';

const initialState = {
  data: [],
  status: 'start',
};

export const asyncGetOnePairing = createAsyncThunk(
  'pairingSlice/asyncGetOnePairing',
  async (pairingId) => {
    return await axios.get(`${PAIRING_URL}/${pairingId}`).then((res) => {
      return res.data.data;
    });
  }
);

export const asyncPostPairing = createAsyncThunk(
  'pairingSlice/asyncPostPairing',
  async (bookId, pairingPostBody) => {
    return await axios
      .post(`/api/books/${bookId}/pairings/add`, pairingPostBody)
      .then((res) => {
        console.log(res.data, pairingPostBody);
        return res.data;
      })
      .catch((err) => {
        console.log('post 실패', err, pairingPostBody);
      });
  }
);

export const pairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetOnePairing.pending, (state) => {
      //   console.log('pending', state, action);
      state.status = 'pending';
    });
    builder.addCase(asyncGetOnePairing.fulfilled, (state, action) => {
      //   console.log('fulfilled', state, action);
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(asyncGetOnePairing.rejected, (state) => {
      //   console.log('reject', state, action);
      state.data = [];
      state.status = 'rejected';
    });
    builder.addCase(asyncPostPairing.pending, (state) => {
      //   console.log('pending', state, action);
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairing.fulfilled, (state) => {
      //   console.log('fulfilled', state, action);
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPostPairing.rejected, (state) => {
      //   console.log('reject', state, action);
      state.data = [];
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
