import "./editProduct.css";
import { observer } from "mobx-react-lite";
import EditProductComp from "../../components/editComp/EditProductComp";
import CustomersByProd from "../../components/costomersByProd/CustomersByProd";
import Menu from "../../components/menu/Menu";
import SelectedProduct from "../../components/selectedProduct/SelectedProduct";

function EditProduct({ store }) {
  const onProductClicked = (product) => {
    store.loadCurEditProduct(product);
  };

  const onUpadeProductClick = (product) => {
    store.updateProduct(product);
  };

  const onDeleteProductClick = (product) => {
    store.deleteProduct(product);
  };

  const onLoadCustomersByProd = (customers) => {
    store.loadCustomersByProd(customers);
  };

  return (
    <div>
      <Menu />
      <div className="wrapperEdit">
        <div className="topEdit">
          <h1>Edit Product Page</h1>

          <SelectedProduct
            products={store.products}
            curEditProductName={store.curEditProduct.name}
            loadCurEditProduct={onProductClicked}
          />
        </div>

        <div className="center">
          <div className="leftCenter">
            <EditProductComp
              curEditProduct={store.curEditProduct}
              loadCurEditProduct={onProductClicked}
              customersByProd={store.customersByProd}
              updateProduct={onUpadeProductClick}
              deleteProduct={onDeleteProductClick}
            />
          </div>
          <div className="rightCenter">
            <CustomersByProd
              curEditProduct={store.curEditProduct}
              loadCustomersByProd={onLoadCustomersByProd}
              customersByProd={store.customersByProd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(EditProduct);
