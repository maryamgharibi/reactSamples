import { Link } from "react-router-dom";
const Product = () => {
  return (
    <div>
      <p>It is Product page</p>
      <ul>
        <li>
          <Link to="/product/p1">A Book</Link>
        </li>
        <li>
          <Link to="/product/p2">A carpet</Link>
        </li>
        <li>
          <Link to="/product/p3">Course</Link>
        </li>
      </ul>
    </div>
  );
};

export default Product;
