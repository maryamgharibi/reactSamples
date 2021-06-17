import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const productDispatcher = useDispatch(cartActions.addProducts(props));
  const addProductHandler = () => {
    console.log("propd in product is ", props);
    productDispatcher(cartActions.addProducts({ id, title, price }));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addProductHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

//We can  write mutating code inside reducers functions in slice. Redux toolkit has transformer function just under reducer
//Don't mutatue Redux state snd especially dob't do it outside the reducer

//Copy array and create a brand new array: cart.items.slice();
//Copy object into a brand new object const updatedItems = {...existingItem}
/*
//This is the sample for updating product items in the component instead of reducers. without mutating the state.
const cart = useSelector(state=> state.cart);
 const addToCartHandler = () => {
   //again we must not mutate the state here, exp: cart.totalquantity = cart.totalQuantity + 1;then I would change a javascript object in memory which is also the part
   // of Redux store, without making Redux aware of it, because it is outside reducers function, which is horrible
    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
    const existingItem = updatedItems.find((item) => item.id === id);//existingItem is an object in memory which is part of Redux store ,because object are reference values

    if (existingItem) {
      const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
      updatedItem.quantity++;
      updatedItem.totalPrice = updatedItem.totalPrice + price;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      );
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems
    };

    dispatch(cartActions.replaceCart(newCart))

*/
//sideEffect free and sync code , would be better be in Reducers and avoid Action Creators and components

//Fr Async code or code with side-effects, you should prefer Action Creators or Components and never use Reducers
