import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const CustomerLine = ({
  purchasedProduct,
  onPurchasedProductClicked,
  roleUser,
}) => {
  const onClick = () => {
    onPurchasedProductClicked(purchasedProduct);
  };

  return (
    <li>
      {roleUser === "admin" ? (
        <Link
          to="/products/edit"
          style={{ textDecoration: "none", color: "black" }}
          onClick={onClick}
        >
          {`product name: ${purchasedProduct.name} | purchase date: ${
            purchasedProduct?.date.split("T")[0]
          }`}
        </Link>
      ) : (
        `product name: ${purchasedProduct.name} | purchase date: ${
          purchasedProduct?.date.split("T")[0]
        }`
      )}
    </li>
  );
};

export default observer(CustomerLine);
