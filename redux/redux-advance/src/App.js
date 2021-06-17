import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = false;
function App() {
  const dispatcher = useDispatch();
  const toggleCart = useSelector((state) => {
    return state.ui.cartIsVisible;
  });
  const notification = useSelector((state) => state.ui.notification);
  //subscription for cart
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatcher(fetchCartData());
  }, [dispatcher]);

  /*   useEffect(() => {
    const sendData = async () => {
      const response = await fetch(
        "https://react-http-fafa3-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", data: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("Failed sent data");
      }
    };
  }, [cart]); */

  useEffect(() => {
    if (!isInitial) {
      isInitial = true;
      return;
    }

    // what we dispatch before,always were action creators, so functions that return an action object with a type
    //Now in cartSlice,we are instead dispatching the function that returns another function.
    //The great thing about Redux ,when using Redux toolkit, is that its prepared for that.
    //It does not just accept action objects with a type property.it also accepts action creators that return functions
    // this dispatching, a action which is actually a function, instead of action objects.it will execute that function for us

    //so Redux will execute the returned function.and that returned function will give us that dispatch argument automatically.
    //so in that executed function, we can dispatch again,
    // after following line, all other actions will be dispatched, and http request will be sent
    if (cart.changed) {
      dispatcher(sendCartData(cart));
    }
  }, [cart, dispatcher]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
