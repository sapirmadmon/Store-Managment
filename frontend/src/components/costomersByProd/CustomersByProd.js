import "./customersByProd.css";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import axios from "axios";
import CustomerComp from "../customer/CustomerComp";

function CustomersByProd({ store }) {
  useEffect(() => {
    const fetchCustomers = async () => {
      if (store.curEditProduct.id !== undefined) {
        const res = await axios.get(
          `http://localhost:3000/purchases/${store.curEditProduct.id}`
        );
        store.loadCustomersByProd(res.data);
      }
    };
    fetchCustomers();
  }, [store.curEditProduct]);

  return (
    <div className="wrapperAllCusts">
      <h3>{store.curEditProduct.name} customer's</h3>
      <div className="allCustomers">
        {store.customersByProd.length > 0 &&
          store.customersByProd.map((customer) => {
            return (
              <CustomerComp
                key={customer.id}
                customer={customer}
                store={store}
              />
            );
          })}
      </div>
    </div>
  );
}

export default observer(CustomersByProd);
