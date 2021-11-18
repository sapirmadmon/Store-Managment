import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products/Products";
import ManageStore from "./ManageStore";
import EditProduct from "./pages/editProduct/EditProduct";
import EditCustomer from "./pages/editCustomer/EditCustomer";
import Customers from "./pages/customers/Customers";
import Purchased from "./pages/purchased/Purchased";
import LoginPage from "./pages/login/LoginPage";

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
