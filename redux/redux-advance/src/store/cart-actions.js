import { isAnyOf } from "@reduxjs/toolkit";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-fafa3-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          product: cartData.product || [],
          count: cartData.count,
        })
      );
    } catch (e) {
      uiActions.showNotification({
        status: "Error",
        title: "Error...",
        message: "Failed",
      });
    }
  };
};

//we could write sendCartData as an action creator, by now returning an action object in here, so object with a type of whatever,and maybe some payload
// return {type: '', payload:...}
//we never did ourselfes because Redux Toolkit creates these action creators automatically for us for all those reducers methods
//Every method in reducers objects receives such an action creator,which is called by using that reducer function name, that is what 's inside the action names:
//cartSide.actions
//we could createan actionCreator which not create such a action object.but instead returns another function.That would be a function that should receive the
//dispatch function as an argument, and then inside the function we can then therefore, dispatch, the actual action we wanna perform.exp: showing the notification.
//or adding a card item, but before we call dispatch, we can perform any async code,any side effects, because we will not yet have reached our reducer.
//we are not running this code in a reducer. Its a separate standalone JS function instead,

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );
    const sendRequest = async () => {
      const responseData = await fetch(
        "https://react-http-fafa3-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({ product: cart.product, count: cart.count }),
        }
      );
      if (!responseData.ok) {
        throw new Error("Error....");
      }
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error...",
          message: "Failed",
        })
      );
    }

    dispatch(
      uiActions.showNotification({
        status: "Success",
        title: "Success...",
        message: "Success",
      })
    );
  };
};
