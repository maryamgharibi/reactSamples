import { Route } from "react-router-dom";

const Customer = () => {
  return (
    <div>
      <p>It is customer page</p>
      <Route path="/customer/new-Customer">
        <p>Welcome</p>
      </Route>
    </div>
  );
};
export default Customer;
