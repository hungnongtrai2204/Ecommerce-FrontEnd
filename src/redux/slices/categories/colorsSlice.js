import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../../components/globalAction/globalAction";
const initialState = {
  colors: [],
  color: {},
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createColorAction = createAsyncThunk(
  "color/create",
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
        `${baseURL}/colors`,
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

export const fetchColorsAction = createAsyncThunk(
  "color/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchColorAction = createAsyncThunk(
  "color/fetch deltail",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const { data } = await axios.get(`${baseURL}/colors/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateColorAction = createAsyncThunk(
  "color/update",
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
        `${baseURL}/colors/${id}`,
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

export const deleteColorAction = createAsyncThunk(
  "color/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/colors/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create color
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.color = null;
    });
    //fetch all colors
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.colors = null;
    });
    //fetch single colors
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.color = null;
    });

    //update color
    builder.addCase(updateColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.color = null;
    });
    //delete brand
    builder.addCase(deleteColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDelete = true;
    });
    builder.addCase(deleteColorAction.rejected, (state, action) => {
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

const colorReducer = colorSlice.reducer;

export default colorReducer;
