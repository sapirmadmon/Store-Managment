import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import axios from "axios";
import ProductComp from "../product/ProductComp";

function ProductsOfCustomer({ store }) {
  useEffect(() => {
    const fetchProducts = async () => {
      if (store.curEditCustomer.id !== undefined) {
        const res = await axios.get(
          `http://localhost:3000/products/customerid/${store.curEditCustomer.id}`
        );
        store.loadProductsByCustomer(res.data);
      }
    };
    fetchProducts();
  }, [store.curEditCustomer]);

  return (
    <div className="wrapperEdit">
      <h4>{store.curEditCustomer.firstname} product's</h4>
      <div className="allProducts">
        {store.productsByCustomer.length > 0 &&
          store.productsByCustomer.map((product) => {
            return (
              <ProductComp
                key={product.id}
                product={product}
                store={store}
                visibleBtn={false}
              />
            );
          })}
      </div>
    </div>
  );
}

export default observer(ProductsOfCustomer);
