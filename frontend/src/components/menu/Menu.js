import "./menu.css";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menuContainer">
      <div className="divTxtMenu">
        <Link to="/products" style={{ textDecoration: "none", color: "white" }}>
          <span>Products</span>
        </Link>
      </div>
      <div className="divTxtMenu">
        <Link
          to="/customers"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span>Customers</span>
        </Link>
      </div>
      <div className="divTxtMenu">
        <Link
          to="/purchases"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span>Purchases</span>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
