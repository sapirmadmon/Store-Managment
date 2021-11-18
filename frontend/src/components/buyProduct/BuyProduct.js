import "./buyProduct.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useState } from "react";

function BuyProduct({ store }) {
  const [chooseProduct, setChooseProduct] = useState("");

  const buyProduct = async () => {
    const product = store.products.filter(
      (prod) => prod.name === chooseProduct
    );
    store.addPurchase(store.curCustomer.customer_id, product[0].id);
  };

  return (
    <div className="buyProdWrapper">
      <br />
      <hr />
      <br />
      <select
        name=""
        id="selectedProduct"
        onChange={(e) => setChooseProduct(e.target.value)}
      >
        <option>{""}</option>
        {toJS(store.products)
          .filter((prod) => prod.quantity > 0)
          .map((prod) => {
            return (
              <option key={prod.id} value={prod.name}>
                {prod.name}
              </option>
            );
          })}
      </select>
      <button id="btnBuy" onClick={buyProduct}>
        Buy!
      </button>
    </div>
  );
}

export default observer(BuyProduct);
