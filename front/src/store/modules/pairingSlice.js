import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { PAIRING_URL } from '../../api/requests';

const initialState = {
  data: {
    pairingRes: { comments: [] },
    bookRes: { title: '' },
  },
  status: 'start',
};

export const asyncGetOnePairing = createAsyncThunk(
  'pairingSlice/asyncGetOnePairing',
  async (pairingId) => {
    try {
      const pairingRes = await axios.get(`${PAIRING_URL}/${pairingId}`);
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncPostPairing = createAsyncThunk(
  'pairingSlice/asyncPostPairing',
  async ({ pairingPostBody, isbn }) => {
    try {
      return await axios.post(
        `/api/books/${isbn}/pairings/add`,
        pairingPostBody
      );
    } catch (error) {
      console.log('페어링 post 실패', error);
    }
  }
);

export const asyncDeletePairing = createAsyncThunk(
  'pairingSlice/asyncDeletePairing',
  async ({ deleteId }) => {
    try {
      return await axios.delete(`${PAIRING_URL}/${deleteId}/delete`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncPatchPairing = createAsyncThunk(
  'pairingSlice/asyncPatchPairing',
  async ({ pairingPatchBody, pairingId }) => {
    try {
      const pairingRes = await axios.patch(
        `${PAIRING_URL}/${pairingId}/edit`,
        pairingPatchBody
      );
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      console.log(error);
    }
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

export const asyncEditPairingComment = createAsyncThunk(
  'pairingSlice/asyncEditPairingComment',
  async ({ commentId, body }) => {
    return await axios
      .patch(`/api/comments/${commentId}/edit`, {
        body: body,
      })
      .then((res) => {
        return res.data.data;
      });
  }
);

export const asyncLikePairingComment = createAsyncThunk(
  'pairingSlice/asyncLikePairingComment',
  async (commentId) => {
    return await axios.patch(`api/comments/${commentId}/like`).then((res) => {
      return res.data.data;
    });
  }
);

export const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //페이링 상세 조회
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
    //페어링 작성
    builder.addCase(asyncPostPairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairing.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPostPairing.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 삭제
    builder.addCase(asyncDeletePairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncDeletePairing.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(asyncDeletePairing.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 수정
    builder.addCase(asyncPatchPairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPatchPairing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPatchPairing.rejected, (state) => {
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
    //comment 수정
    builder.addCase(asyncEditPairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncEditPairingComment.fulfilled, (state, action) => {
      state.data.comments = state.data.comments.map((el) => {
        if (el.commentId === action.payload.commentId) {
          return action.payload;
        } else return el;
      });
      state.status = 'fulfilled';
    });
    builder.addCase(asyncEditPairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
    //comment 좋아요
    builder.addCase(asyncLikePairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncLikePairingComment.fulfilled, (state, action) => {
      state.data.comments = state.data.comments.map((el) => {
        if (el.commentId === action.payload.commentId) {
          return action.payload;
        } else return el;
      });
      state.status = 'fulfilled';
    });
    builder.addCase(asyncLikePairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
