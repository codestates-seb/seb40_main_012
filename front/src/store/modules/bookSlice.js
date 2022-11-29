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
    try {
      const res = await axios.get(`${BOOKS_URL}/${isbn}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postBookPick = createAsyncThunk(
  'bookSlice/postBookPick',
  async (isbn) => {
    try {
      const res = await axios.post(`${BOOKS_URL}/${isbn}/bookmark`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postBookComment = createAsyncThunk(
  'bookSlice/postBookComment',
  async ({ isbn, commentBody }) => {
    try {
      return await axios
        .post(`${BOOKS_URL}/${isbn}/comments/add`, commentBody)
        .then((res) => {
          return res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }
);
export const patchBookStarRating = createAsyncThunk(
  'bookSlice/postBookStarRating',
  async ({ isbn, ratingBody }) => {
    try {
      return await axios.patch(`${BOOKS_URL}/${isbn}/rating`, ratingBody);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBookComment = createAsyncThunk(
  'bookSlice/deleteBookComment',
  async (commentId) => {
    try {
      return await axios
        .delete(`/api/comments/${commentId}/delete`)
        .then(() => {
          return commentId;
        });
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookAsync.pending, (state) => {
      state.status = 'getBookAsync/pending';
    });
    builder.addCase(getBookAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'getBookAsync/fulfilled';
    });
    builder.addCase(getBookAsync.rejected, (state) => {
      state.data = [];
      state.status = 'getBookAsync/rejected';
    });
    //북마크
    builder.addCase(postBookPick.pending, (state) => {
      state.status = 'postBookPick/pending';
    });
    builder.addCase(postBookPick.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'postBookPick/fulfilled';
    });
    builder.addCase(postBookPick.rejected, (state) => {
      state.data = [];
      state.status = 'postBookPick/rejected';
    });
    // 책 코멘트
    builder.addCase(postBookComment.pending, (state) => {
      state.status = 'postBookComment/pending';
    });
    builder.addCase(postBookComment.fulfilled, (state, action) => {
      state.data.comments.content.push(action.payload);
      state.status = 'postBookComment/fulfilled';
    });
    builder.addCase(postBookComment.rejected, (state) => {
      state.status = 'postBookComment/rejected';
    });
    //책 별점
    builder.addCase(patchBookStarRating.pending, (state) => {
      state.status = 'postBookStarRating/pending';
    });
    builder.addCase(patchBookStarRating.fulfilled, (state) => {
      state.status = 'postBookStarRating/fulfilled';
    });
    builder.addCase(patchBookStarRating.rejected, (state) => {
      state.status = 'postBookStarRating/rejected';
    });
    //
    builder.addCase(deleteBookComment.pending, (state) => {
      state.status = 'postBookComment/pending';
    });
    builder.addCase(deleteBookComment.fulfilled, (state, action) => {
      state.data.comments.content = state.data.comments.content.filter(
        (el) => el.commentId !== action.payload
      );
      state.status = 'postBookComment/fulfilled';
    });
    builder.addCase(deleteBookComment.rejected, (state) => {
      state.status = 'postBookComment/rejected';
    });
  },
});

export default bookSlice.reducer;
