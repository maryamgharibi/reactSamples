import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { count: 0, product: [], totalAmount: 0, changed: false },
  reducers: {
    increaseCount(state) {
      state.count++;
    },
    decreaseCount(state) {
      if (state.count > 0) {
        state.count--;
      }
    },
    replaceCart(state, action) {
      state.count = action.payload.count;
      state.product = action.payload.product;
    },
    addProducts(state, action) {
      const newItem = action.payload;
      const existingItem = state.product.find((elem) => elem.id === newItem.id);
      state.count++;
      state.changed = true;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = newItem.price + existingItem.totalPrice;
      } else {
        state.product.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
    },
    removeProducts(state, action) {
      const id = action.payload;
      state.count--;
      state.changed = true;
      const existingItem = state.product.find((elem) => elem.id === id);
      if (existingItem.quantity === 1) {
        state.product = state.product.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//ACtionCreators: We used Action Creators all the time: uiActions.showNotification is ActionCreators, We get those action creators automatically
// by redux toolkit.and we called them to create the action objects which we dispatch.
// So, those are automatically created action creators: exp: uiActions.showNotification
// we can create our own action creators to create so-called thunks.
// what is the thunks and why might we want to do that?
//A thunk is a function that delays an action until later.
//until something else finished. And we could write an action creator as a thunk,
// to write an action creator which does not immediately return the action object,
//An action creator function that does NOT return the action itself but another function which eventually returns the action
//So we can run some other code before we then dispatch the actual action object that we did want to create.

export const cartActions = cartSlice.actions;
export default cartSlice;
