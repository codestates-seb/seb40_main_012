import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { PAIRING_URL } from '../../api/requests';

const initialState = {
  data: {
    comments: [],
  },
  status: 'start',
};

export const asyncGetOnePairing = createAsyncThunk(
  'pairingSlice/asyncGetOnePairing',
  async (pairingId) => {
    return await axios.get(`${PAIRING_URL}/${pairingId}`).then((res) => {
      console.log(res.data.data.content);
      return res.data.data;
    });
  }
);

export const asyncPostPairingComment = createAsyncThunk(
  'pairingSlice/asyncPostPairngComment',
  async ({ pairingId, body }) => {
    console.log(pairingId, body);
    return await axios
      .post(`/api/pairings/${pairingId}/comments/add`, {
        body: body,
      })
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
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
    //comment 추가
    builder.addCase(asyncPostPairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairingComment.fulfilled, (state, action) => {
      state.data.comments.push(action.payload);
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPostPairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
