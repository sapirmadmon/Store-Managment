import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./views/products/Products";
import ManageStore from "./ManageStore";
import EditProduct from "./views/editProduct/EditProduct";
import EditCustomer from "./views/editCustomer/EditCustomer";
import Customers from "./views/customers/Customers";
import Purchased from "./views/purchased/Purchased";
import LoginPage from "./views/login/LoginPage";

const App = () => {
  const manageStore = new ManageStore();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage store={manageStore} />} />
        <Route
          exact
          path="/products"
          element={<Products store={manageStore} />}
        />
        <Route
          exact
          path="/products/edit"
          element={<EditProduct store={manageStore} />}
        />
        <Route
          exact
          path="/customers"
          element={<Customers store={manageStore} />}
        />
        <Route
          exact
          path="/customers/edit"
          element={<EditCustomer store={manageStore} />}
        />
        <Route
          exact
          path="/purchases"
          element={<Purchased store={manageStore} />}
        />
      </Routes>
    </div>
  );
};

export default App;
