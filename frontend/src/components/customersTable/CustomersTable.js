import "./customersTable.css";
import { observer } from "mobx-react-lite";
import CustomerRow from "./components/CustomerRow";
import { toJS } from "mobx";

function CustomersTable({ store }) {
  return (
    <div className="wrapperTable">
      <table id="customers">
        <tbody>
          <tr>
            <th>Customer</th>
            <th>Items purchased</th>
            <th>Add Product</th>
          </tr>
          {store.customers.map((customer, index) => {
            const customerPurchases = toJS(
              store.purchases.filter((pur) => pur.customer_id == customer.id)
            );

            const onLoadCurEditProductClicked = (product) => {
              store.loadCurEditProduct(product);
            };

            const onLoadCurEditCustomerClicked = (customer) => {
              store.loadcurCustomer(customer);
            };

            return (
              <CustomerRow
                key={index}
                customer={customer}
                customerPurchases={customerPurchases}
                loadCurEditProduct={onLoadCurEditProductClicked}
                loadcurCustomer={onLoadCurEditCustomerClicked}
                roleUser={store.roleUser}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default observer(CustomersTable);
