import "./productComp.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function ProductComp({ store, product, visibleBtn }) {
  return (
    <div className="productCard">
      <div className="left">
        <strong>Name: </strong>
        {store.roleUser === "admin" ? (
          <Link
            to="/products/edit"
            style={{ textDecoration: "none", color: "black" }}
            onClick={(e) => store.loadCurEditProduct(product)}
          >
            {product.name}
          </Link>
        ) : (
          `${product.name}`
        )}
        <br />
        <br />
        <strong>Price: </strong> {product.price}
        <br />
        <br />
        <strong>Quantity: </strong> {product.quantity}
      </div>
      <div className="right">
        {visibleBtn && (
          <button
            className="btnShow"
            onClick={() => store.loadCurProduct(product)}
          >
            customers who purchased
          </button>
        )}
      </div>
    </div>
  );
}

export default observer(ProductComp);
