import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../../components/globalAction/globalAction";
const initialState = {
  categories: [],
  category: {},
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, file } = payload;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCategoryAction = createAsyncThunk(
  "category/update",
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
        `${baseURL}/categories/${id}`,
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

export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseURL}/categories/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCategorieAction = createAsyncThunk(
  "category/fetch deltail",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {id} = payload;
      const { data } = await axios.get(`${baseURL}/categories/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //create category
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.category = null;
    });
     //update category
     builder.addCase(updateCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.category = null;
    });
//delete category
builder.addCase(deleteCategoryAction.pending, (state) => {
  state.loading = true;
});
builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
  state.loading = false;
  state.isDelete = true;
});
builder.addCase(deleteCategoryAction.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.isDelete = false;
});
    //fetch all categories
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = null;
    });
     //fetch single categories
     builder.addCase(fetchCategorieAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategorieAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategorieAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.category = null;
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

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
