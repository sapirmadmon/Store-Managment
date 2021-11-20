import "./customersByProd.css";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import axios from "axios";
import CustomerComp from "../customer/CustomerComp";

function CustomersByProd({
  curEditProduct,
  loadCustomersByProd,
  customersByProd,
}) {
  useEffect(() => {
    const fetchCustomers = async () => {
      if (curEditProduct.id !== undefined) {
        const res = await axios.get(
          `http://localhost:3000/purchases/${curEditProduct.id}`
        );
        loadCustomersByProd(res.data);
      }
    };
    fetchCustomers();
  }, [curEditProduct]);

  return (
    <div className="wrapperAllCusts">
      <h3>{curEditProduct.name} customer's</h3>
      <div className="allCustomers">
        {customersByProd.length > 0 &&
          customersByProd.map((customer) => {
            return <CustomerComp key={customer.id} customer={customer} />;
          })}
      </div>
    </div>
  );
}

export default observer(CustomersByProd);
