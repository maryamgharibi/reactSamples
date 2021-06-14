import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch({ type: "TOGGLE" });
  };
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);
  const incrementHandler = () => {
    dispatch({ type: "INCREMENT" });
  };
  const decrementHandler = () => {
    dispatch({ type: "DECREMENT" });
  };
  const increseHandler = () => {
    dispatch({ type: "INCREASE", value: 5 });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>

      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increseHandler}>Increse By 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
