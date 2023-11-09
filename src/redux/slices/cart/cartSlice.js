import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const addOrderToCartAction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);

export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);

export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId?.toString()) {
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

export const removeOrderItemQty = createAsyncThunk(
  "cart/removeOrderItem",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //create cart
    builder.addCase(addOrderToCartAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.isAdded = true;
    });
    builder.addCase(addOrderToCartAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.cartItems = null;
    });
    //get cart
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      }
    );
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cartItems = null;
      }
    );
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
