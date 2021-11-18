import './editProduct.css';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useState, useEffect } from 'react';
import EditProductComp from '../../components/editComp/EditProductComp';
import CustomersByProd from '../../components/costomersByProd/CustomersByProd';
import Menu from '../../components/menu/Menu';

function EditProduct({store}) {
    const [chooseProductName, setChooseProductName] = useState(store.curEditProduct.name);

    useEffect(() => {
        const product = store.products.filter((prod) => prod.name === chooseProductName);
        store.loadCurEditProduct(product[0]);    
      }, [chooseProductName]);

    return (
        <div>
            <Menu/>
            <div className="wrapperEdit">
                <div className="topEdit">
                        <h1>Edit Product Page</h1>
                        <select name="" id="selectedProduct" value={chooseProductName} onChange={(e) => setChooseProductName(e.target.value)}>
                            {toJS(store.products).map((prod) => {
                                return <option key={prod.id} value={prod.name}>{prod.name}</option>
                            })}
                        </select>
                </div>

                <div className="center">
                    <div className="leftCenter">
                        <EditProductComp store={store}/>

                    </div>
                    <div className="rightCenter">
                        <CustomersByProd store={store}/>

                    </div>

                </div>


            </div>

            
                

           
        </div>
    )
}

export default observer(EditProduct)
