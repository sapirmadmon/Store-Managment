import Menu from "../../components/menu/Menu";
import "./purchased.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

function Purchased({ store }) {
  const [chooseProduct, setChooseProduct] = useState("");
  const [chooseCustomer, setChooseCustomer] = useState("");
  const [chooseDate, setChooseDate] = useState("");

  const [allData, setAllData] = useState([]);
  const [dataFiltering, setDataFiltering] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const res = await axios.get(`http://localhost:3000/purchases`);
      setAllData(res.data);
    };
    fetchPurchases();
  }, []);

  const searchByFiltering = () => {
    let arrFilter = allData
      .filter((row) => {
        return !chooseCustomer ? true : row.customer_id === chooseCustomer;
      })
      .filter((row) => {
        return !chooseProduct ? true : row.product_id === chooseProduct;
      })
      .filter((row) => {
        return !chooseDate ? true : row.date.split("T")[0] === chooseDate;
      });

    setDataFiltering(arrFilter);
  };

  return (
    <div>
      <Menu />
      <h1 id="title">Purchased Page</h1>
      <div className="purchased">
        <div className="wrapper">
          <div className="top">
            <select
              name=""
              id="selectProduct"
              onChange={(e) => setChooseProduct(e.target.value)}
            >
              <option value={""}>{""}</option>
              {toJS(store.products).map((prod) => {
                return (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                );
              })}
            </select>

            <select
              name=""
              id="selectCustomer"
              onChange={(e) => setChooseCustomer(e.target.value)}
            >
              <option value={""}>{""}</option>
              {toJS(store.customers).map((customer) => {
                return (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstname}
                  </option>
                );
              })}
            </select>

            <input
              type="date"
              id="date"
              onChange={(e) => setChooseDate(e.target.value)}
            />

            <button id="btnSearch" onClick={searchByFiltering}>
              Search
            </button>
          </div>
          <div className="down">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Customer Name</th>
                  <th>Purchased Product</th>
                  <th>Purchase Date</th>
                </tr>

                {dataFiltering.map((row, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td>{`${row.firstname} ${row.lastname}`}</td>
                        <td>{row.name}</td>
                        <td>{row.date.split("T")[0]}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Purchased);
