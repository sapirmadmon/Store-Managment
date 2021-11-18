import "./customerPsurchasesByProd.css";
import { useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import CustomerPurchaseComp from "../customerPurchase/CustomerPurchaseComp";

function CustomerPsurchasesByProd({ store }) {
  useEffect(() => {
    const fetchCustomers = async () => {
      if (store.curProduct.id !== undefined) {
        const res = await axios.get(
          `http://localhost:3000/purchases/${store.curProduct.id}`
        );
        store.loadCustomersByProd(res.data);
      }
    };
    fetchCustomers();
  }, [store.curProduct]);

  return (
    <div className="customersList">
      <h4>
        {store.curProduct.name != undefined &&
          `Customers who bought ${store.curProduct.name}`}
      </h4>

      {store.customersByProd.length > 0 &&
        store.customersByProd.map((customer) => {
          return (
            <CustomerPurchaseComp
              key={customer.id}
              customer={customer}
              store={store}
            />
          );
        })}
    </div>
  );
}

export default observer(CustomerPsurchasesByProd);
