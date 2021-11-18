import { observer } from "mobx-react-lite";
import "../customersTable.css";
import CustomerLine from "./CustomerLine";
import { toJS } from "mobx";

function CustomerRow({
  customerPurchases,
  customer,
  loadCurEditProduct,
  loadcurCustomer,
  roleUser,
}) {
  const onProductClicked = (product) => {
    loadCurEditProduct(product);
  };

  return (
    <tr>
      <td>{`${customer.firstname} ${customer.lastname}`}</td>
      <td>
        <ul>
          {customerPurchases.map((purchase) => {
            return (
              <div key={purchase.id}>
                <CustomerLine
                  purchasedProduct={purchase}
                  onPurchasedProductClicked={onProductClicked}
                  roleUser={roleUser}
                />
              </div>
            );
          })}
        </ul>
      </td>
      <td>
        <center>
          <button
            id="btnAddProduct"
            onClick={(e) => loadcurCustomer(toJS(customer))}
          >
            Add Product
          </button>
        </center>
      </td>
    </tr>
  );
}

export default observer(CustomerRow);
