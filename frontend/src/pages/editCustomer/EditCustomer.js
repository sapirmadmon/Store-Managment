import EditCustomerComp from "../../components/editComp/EditCustomerComp";
import "./editCustomer.css";
import { observer } from "mobx-react-lite";
import Menu from "../../components/menu/Menu";
import ProductsOfCustomer from "../../components/productsOfCustomer/ProductsOfCustomer";

function EditCustomer({ store }) {
  return (
    <div>
      <Menu />
      <div className="wrapperEditCustomer">
        {/* <div className="top"> */}
        <h1>Edit Customer Page</h1>
        {/* </div> */}
        <div className="center">
          <div className="leftEditCustomerPage">
            <EditCustomerComp store={store} />
          </div>
          <div className="rightEditCustomerPage">
            <ProductsOfCustomer store={store} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(EditCustomer);
