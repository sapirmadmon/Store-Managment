import "./customerPurchaseComp.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import BuyProduct from "../buyProduct/BuyProduct";
import { useState } from "react";
function CustomerPurchaseComp({ store, customer }) {
  const [displayDivAdd, setDisplayDivAdd] = useState("none");

  return (
    <div className="customerPurchaseCard">
      <div className="up">
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Customer name: </strong>
              </td>
              <td>
                {store.roleUser === "admin" ? (
                  <Link
                    to="/customers/edit"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={(e) => store.loadCurEditCustomer(customer)}
                  >
                    {`${customer.firstname} ${customer.lastname}`}
                  </Link>
                ) : (
                  `${customer.firstname} ${customer.lastname}`
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Purchased date: </strong>
              </td>
              <td>{customer.date.split("T")[0]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="down">
        <button
          className="btnAdd"
          onClick={(e) => {
            store.loadcurCustomer(customer);
            setDisplayDivAdd("block");
          }}
        >
          Add Product to {customer.firstname}
        </button>
      </div>

      <div>{displayDivAdd === "block" && <BuyProduct store={store} />}</div>
    </div>
  );
}

export default observer(CustomerPurchaseComp);
