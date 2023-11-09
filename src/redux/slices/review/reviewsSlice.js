import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../../components/globalAction/globalAction";
const initialState = {
  reviews: [],
  review: {},
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createReviewAction = createAsyncThunk(
  "review/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { rating, message, id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/reviews/${id}`,
        {
          rating,
          message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    //create review
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.review = null;
    });

    //reset success
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });
    //reset error
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  },
});

const reviewReducer = reviewSlice.reducer;

export default reviewReducer;
