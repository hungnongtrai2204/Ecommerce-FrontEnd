import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../../components/globalAction/globalAction";

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  stats: null,
};

export const createOrderAction = createAsyncThunk(
  "order/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice, cod } = payload;

      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/orders`,
        {
          orderItems,
          shippingAddress,
          totalPrice,
          cod,
        },
        config
      );
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateOrderAction = createAsyncThunk(
  "order/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { status, id } = payload;

      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/orders/update/${id}`,
        {
          status,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchOrdersAction = createAsyncThunk(
  "order/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ordersStatsAction = createAsyncThunk(
  "order/statistics",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchOrderAction = createAsyncThunk(
  "order/detail",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders/${orderId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.order = null;
    });
    //update
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.order = null;
    });
    //fetch all
    builder.addCase(fetchOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.orders = null;
    });
    //fetch all
    builder.addCase(ordersStatsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ordersStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(ordersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.stats = null;
    });
    //fetch detail
    builder.addCase(fetchOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
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

const orderReducer = orderSlice.reducer;

export default orderReducer;
