import './editComp.css';
import { observer } from 'mobx-react-lite';

function EditProductComp({store}) {

    const updateProduct = async () => {
        store.updateProduct(store.curEditProduct);
    }

    const deleteProduct = async () => {
        store.deleteProduct(store.curEditProduct);
        store.curEditProduct = {name: "", price: "", quantity: ""};
        store.customersByProd = [];
        alert("The product has been deleted");
    }

    return (
        <div className="wrapperEditProd">
            <div className="inputs">
                <table>
                    <tbody>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td><input type="text" value={store.curEditProduct.name} onChange={(e) => store.loadCurEditProduct({...store.curEditProduct, name: e.target.value})} /></td>
                    </tr>
                    <tr>
                        <td> <strong>Price</strong></td>
                        <td><input type="text" value={store.curEditProduct.price} onChange={(e) => store.loadCurEditProduct({...store.curEditProduct, price: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><strong>Quantity</strong></td>
                        <td><input type="text" value={store.curEditProduct?.quantity}  onChange={(e) => store.loadCurEditProduct({...store.curEditProduct, quantity: e.target.value})}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div className="btns">
                <button className="btn" onClick={updateProduct}>Update</button>
                <button className="btn" onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    )
}

export default observer(EditProductComp)
