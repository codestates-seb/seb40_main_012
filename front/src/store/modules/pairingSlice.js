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
  async (pairingId, thunkAPI) => {
    try {
      const pairingRes = await axios.get(`${PAIRING_URL}/${pairingId}`);
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const asyncDeletePairing = createAsyncThunk(
  'pairingSlice/asyncDeletePairing',
  async ({ deleteId }, thunkAPI) => {
    try {
      return await axios.delete(`${PAIRING_URL}/${deleteId}/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const asyncPatchPairing = createAsyncThunk(
  'pairingSlice/asyncPatchPairing',
  async ({ formData, pairingId }, thunkAPI) => {
    try {
      const pairingRes = await axios.patch(
        `${PAIRING_URL}/${pairingId}/edit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const asyncPairingLike = createAsyncThunk(
  'pairingSlice/asyncPairingLike',
  async (pairingId, thunkAPI) => {
    try {
      const pairingRes = await axios.patch(`${PAIRING_URL}/${pairingId}/like`);
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const asyncPairingDislike = createAsyncThunk(
  'pairingSlice/asyncPairingDislike',
  async (pairingId, thunkAPI) => {
    try {
      const pairingRes = await axios.patch(
        `${PAIRING_URL}/${pairingId}/dislike`
      );
      const isbn = pairingRes.data.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data.data, bookRes: bookRes.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const asyncPairingPick = createAsyncThunk(
  'pairingSlice/asyncPairingPick',
  async (pairingId, thunkAPI) => {
    try {
      const pairingRes = await axios.post(
        `${PAIRING_URL}/${pairingId}/bookmark`
      );
      const isbn = pairingRes.data.isbn13;
      const bookRes = await axios.get(`api/books/${isbn}`);
      return { pairingRes: pairingRes.data, bookRes: bookRes.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

export const asyncDislikePairingComment = createAsyncThunk(
  'pairingSlice/asyncDislikePairingComment',
  async (commentId) => {
    return await axios
      .patch(`api/comments/${commentId}/dislike`)
      .then((res) => {
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
      state.status = 'asyncGetOnePairing/pending';
    });
    builder.addCase(asyncGetOnePairing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'asyncGetOnePairing/fulfilled';
    });
    builder.addCase(asyncGetOnePairing.rejected, (state) => {
      state.data = [];
      state.status = 'rejected';
    });
    //페어링 삭제
    builder.addCase(asyncDeletePairing.pending, (state) => {
      state.status = 'asyncDeletePairing/pending';
    });
    builder.addCase(asyncDeletePairing.fulfilled, (state) => {
      state.status = 'asyncDeletePairing/fulfilled';
    });
    builder.addCase(asyncDeletePairing.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 수정
    builder.addCase(asyncPatchPairing.pending, (state) => {
      state.status = 'asyncPatchPairing/pending';
    });
    builder.addCase(asyncPatchPairing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'asyncPatchPairing/fulfilled';
    });
    builder.addCase(asyncPatchPairing.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 좋아요
    builder.addCase(asyncPairingLike.pending, (state) => {
      state.status = 'asyncPairingLike/pending';
    });
    builder.addCase(asyncPairingLike.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'asyncPairingLike/fulfilled';
    });
    builder.addCase(asyncPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 좋아요 취소
    builder.addCase(asyncPairingDislike.pending, (state) => {
      state.status = 'asyncPairingDislike/pending';
    });
    builder.addCase(asyncPairingDislike.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'asyncPairingDislike/fulfilled';
    });
    builder.addCase(asyncPairingDislike.rejected, (state) => {
      state.status = 'rejected';
    });
    //페어링 북마크(나의 픽)
    builder.addCase(asyncPairingPick.pending, (state) => {
      state.status = 'asyncPairingPick/pending';
    });
    builder.addCase(asyncPairingPick.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'asyncPairingPick/fulfilled';
    });
    builder.addCase(asyncPairingPick.rejected, (state) => {
      state.status = 'rejected';
    });
    //comment 추가
    builder.addCase(asyncPostPairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairingComment.fulfilled, (state, action) => {
      state.data.pairingRes.comments.push(action.payload);
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
      state.data.pairingRes.comments = state.data.pairingRes.comments.filter(
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
      state.data.pairingRes.comments = state.data.pairingRes.comments.map(
        (el) => {
          if (el.commentId === action.payload.commentId) {
            return { ...el, body: action.payload.body };
          } else return el;
        }
      );
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
      state.data.pairingRes.comments = state.data.pairingRes.comments.map(
        (el) => {
          if (el.commentId === action.payload.commentId) {
            return { ...el, likeCount: action.payload.likeCount };
          } else return el;
        }
      );
      state.status = 'fulfilled';
    });
    builder.addCase(asyncLikePairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
    //comment 좋아요 취소
    builder.addCase(asyncDislikePairingComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncDislikePairingComment.fulfilled, (state, action) => {
      state.data.pairingRes.comments = state.data.pairingRes.comments.map(
        (el) => {
          if (el.commentId === action.payload.commentId) {
            return { ...el, likeCount: action.payload.likeCount };
          } else return el;
        }
      );
      state.status = 'fulfilled';
    });
    builder.addCase(asyncDislikePairingComment.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
