import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const products = useSelector((state) => state.cart.product);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>

      <ul>
        {products.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
