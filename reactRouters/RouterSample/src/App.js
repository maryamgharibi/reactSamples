import { Route, Switch, Redirect } from "react-router-dom";
import Customer from "./pages/customer";
import Product from "./pages/Product";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/customer" />
          </Route>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/product" exact>
            <Product />
          </Route>
          <Route path="/product/:productId">
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
