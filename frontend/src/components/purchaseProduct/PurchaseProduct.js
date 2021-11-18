import "./purchaseProduct.css";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useState } from "react";

function PurchaseProduct({ store }) {
  const [chooseProduct, setChooseProduct] = useState("");

  const buyProduct = async () => {
    const product = store.products.filter(
      (prod) => prod.name === chooseProduct
    );
    store.addPurchase(store.curCustomer.id, product[0].id);
    alert("Product purchased successfully!");
  };

  return (
    <div className="wrapperBuyProduct">
      <h3>Purchase Product for {store.curCustomer.firstname}</h3>
      <div
        className="radios"
        onChange={(e) => setChooseProduct(e.target.value)}
      >
        {store.products
          .filter((prod) => prod.quantity > 0)
          .map((prod, index) => (
            <Fragment key={index}>
              <input type="radio" value={prod.name} name="product" />
              <label>{prod.name}</label>
              <br />
            </Fragment>
          ))}
      </div>
      <div className="btnBuy">
        <button id="btnBuyProduct" onClick={buyProduct}>
          Buy It!
        </button>
      </div>
    </div>
  );
}

export default observer(PurchaseProduct);
