import './editComp.css';
import { observer } from 'mobx-react-lite';

function EditCustomerComp({store}) {

    const updateCustomer = async () => {
        store.updateCustomer(store.curEditCustomer);
    }

    const deleteCustomer = async () => {
        store.deleteCustomer(store.curEditCustomer);
        store.curEditCustomer = {firstname: "", lastname: "", city: ""};
        store.productsByCustomer = [];
        alert("The customer has been deleted");
    }

    return (
        <div className="wrapperEditProd">
            <div className="inputs">
                <table>
                    <tbody>
                    <tr>
                        <td><strong>First Name</strong></td>
                        <td><input type="text" value={store.curEditCustomer.firstname} onChange={(e) => store.loadCurEditCustomer({...store.curEditCustomer, firstname: e.target.value})} /></td>
                    </tr>
                    <tr>
                        <td> <strong>Last Name</strong></td>
                        <td><input type="text" value={store.curEditCustomer.lastname} onChange={(e) => store.loadCurEditCustomer({...store.curEditCustomer, lastname: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><strong>City</strong></td>
                        <td><input type="text" value={store.curEditCustomer.city}  onChange={(e) => store.loadCurEditCustomer({...store.curEditCustomer, city: e.target.value})}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div className="btns">
                <button className="btn" onClick={updateCustomer}>Update</button>
                <button className="btn" onClick={deleteCustomer}>Delete</button>
            </div>
        </div>
    )
}

export default observer(EditCustomerComp)
