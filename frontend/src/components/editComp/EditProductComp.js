import "./editComp.css";
import { observer } from "mobx-react-lite";

function EditProductComp({
  curEditProduct,
  loadCurEditProduct,
  customersByProd,
  updateProduct,
  deleteProduct,
}) {
  const onUpdateProduct = async () => {
    updateProduct(curEditProduct);
  };

  const onDeleteProduct = async () => {
    deleteProduct(curEditProduct);
    curEditProduct = { name: "", price: "", quantity: "" };
    customersByProd = [];
    alert("The product has been deleted");
  };

  return (
    <div className="wrapperEditProd">
      <div className="inputs">
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Name</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={curEditProduct.name}
                  onChange={(e) =>
                    loadCurEditProduct({
                      ...curEditProduct,
                      name: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Price</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={curEditProduct.price}
                  onChange={(e) =>
                    loadCurEditProduct({
                      ...curEditProduct,
                      price: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Quantity</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={curEditProduct?.quantity}
                  onChange={(e) =>
                    loadCurEditProduct({
                      ...curEditProduct,
                      quantity: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className="btns">
        <button className="btn" onClick={onUpdateProduct}>
          Update
        </button>
        <button className="btn" onClick={onDeleteProduct}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default observer(EditProductComp);
