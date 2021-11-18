import "./customers.css";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CustomersTable from "../../components/customersTable/CustomersTable";
import Menu from "../../components/menu/Menu";
import PurchaseProduct from "../../components/purchaseProduct/PurchaseProduct";

function Customers({ store }) {
  useEffect(() => {
    const fetchCustomers = async () => {
      //   const res = await axios.get(`http://localhost:3000/customers`);
      //   store.loadCustomers(res.data);

      store.curCustomer = {};
    };
    fetchCustomers();
  }, []);

  return (
    <>
      <Menu />
      <div className="wrapperCustomerPage">
        {/* <CusomerPageHeader title={Customers Page} /> */}
        <h1>Customers Page</h1>
        {/* <CustomerPageBody /> */}

        <div className="wrapperCustomers">
          <div className="left">
            <CustomersTable store={store} />
          </div>
          <div className="right">
            {store.curCustomer.id !== undefined && (
              <PurchaseProduct store={store} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(Customers);
