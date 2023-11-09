import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../../components/globalAction/globalAction";
const initialState = {
  brands: [],
  brand: {},
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchBrandsAction = createAsyncThunk(
  "brand/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchBrandAction = createAsyncThunk(
  "brand/fetch deltail",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const { data } = await axios.get(`${baseURL}/brands/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateBrandAction = createAsyncThunk(
  "brand/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/brands/${id}`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteBrandAction = createAsyncThunk(
  "brand/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/brands/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //create brand
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.brand = null;
    });
    //fetch all brands
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.brands = null;
    });
    //fetch single brands
    builder.addCase(fetchBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    });
    builder.addCase(fetchBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.brand = null;
    });
    //update brand
    builder.addCase(updateBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.brand = null;
    });
    //delete brand
    builder.addCase(deleteBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDelete = true;
    });
    builder.addCase(deleteBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isDelete = false;
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

const brandReducer = brandSlice.reducer;

export default brandReducer;
