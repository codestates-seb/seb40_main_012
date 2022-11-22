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
      return res.data.data;
    });
  }
);

export const asyncPostPairing = createAsyncThunk(
  'pairingSlice/asyncPostPairing',
  async ({ pairingPostBody, isbn }) => {
    console.log('axios.defaults.headers', axios.defaults.headers);
    return await axios
      .post(`/api/books/${isbn}/pairings/add`, pairingPostBody)
      .then((res) => {
        console.log('성공', res);
      })
      .catch((err) => {
        console.log('post 실패', err);
      });
  }
);

export const asyncPostPairingComment = createAsyncThunk(
  'pairingSlice/asyncPostPairngComment',
  async ({ pairingId, body }) => {
    return await axios
      .post(`/api/pairings/${pairingId}/comments/add`, {
        body: body,
      })
      .then((res) => {
        return res.data.data;
      });
  }
);

export const asyncDeletePairingComment = createAsyncThunk(
  'pairingSlice/asyncDeletePairingComment',
  async (commentId) => {
    return await axios.delete(`/api/comments/${commentId}/delete`).then(() => {
      return commentId;
    });
  }
);

export const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetOnePairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetOnePairing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(asyncGetOnePairing.rejected, (state) => {
      state.data = [];
      state.status = 'rejected';
    });
    builder.addCase(asyncPostPairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairing.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPostPairing.rejected, (state) => {
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
    //comment 삭제
    builder.addCase(asyncDeletePairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncDeletePairingComment.fulfilled, (state, action) => {
      state.data.comments = state.data.comments.filter(
        (el) => el.commentId !== action.payload
      );
      state.status = 'fulfilled';
    });
    builder.addCase(asyncDeletePairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
