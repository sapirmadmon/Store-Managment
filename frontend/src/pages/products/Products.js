import Menu from "../../components/menu/Menu";
import ProductComp from "../../components/product/ProductComp";
import "./products.css";
import { observer } from "mobx-react-lite";
import TotalPurchases from "../../components/totalPurchases/TotalPurchases";
import CustomerPsurchasesByProd from "../../components/customerPurchasesByProd/CustomerPsurchasesByProd";

function Products({ store }) {
  return (
    <div className="products">
      <Menu />

      <div className="top">
        <h1>Products Page</h1>
        <div className="amountDiv">
          <TotalPurchases store={store} />
        </div>
      </div>
      <div className="wrapperProducts">
        <div className="leftProductList">
          {store.products.map((product) => {
            return (
              <ProductComp
                key={product.id}
                product={product}
                store={store}
                visibleBtn={true}
              />
            );
          })}
        </div>
        <div className="right">
          <div className="rightUp">
            <CustomerPsurchasesByProd store={store} />
          </div>
          <div className="rightDown"></div>
        </div>
      </div>
    </div>
  );
}

export default observer(Products);
