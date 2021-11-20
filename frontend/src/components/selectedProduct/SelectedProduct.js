import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useState, useEffect } from "react";

function SelectedProduct({ products, curEditProductName, loadCurEditProduct }) {
  const [chooseProductName, setChooseProductName] =
    useState(curEditProductName);

  useEffect(() => {
    const product = products.filter((prod) => prod.name === chooseProductName);
    loadCurEditProduct(product[0]);
  }, [chooseProductName]);

  return (
    <>
      <select
        name=""
        id="selectedProduct"
        value={chooseProductName}
        onChange={(e) => setChooseProductName(e.target.value)}
      >
        {toJS(products).map((prod) => {
          return (
            <option key={prod.id} value={prod.name}>
              {prod.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default observer(SelectedProduct);
