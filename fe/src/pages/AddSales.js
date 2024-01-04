import {API_BASE_URL} from '../../src/config';
// Import the styles from the 'Form.css' file
import './Form.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
// Functional component for adding sales entry
const AddSales = () => {
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productAmount, setProductAmount] = useState(0);

    const [loading, setLoading] = useState(false);
    const add_product = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { productName: productName, productQuantity: productQuantity, productAmount:productAmount }
        axios.post(`${API_BASE_URL}/add_product`, requestData,CONFIG_OBJ)
            .then((result) => {
                console.log(result);
                if (result.status == 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Product successfully added'
                    })
                }
                setProductName('');
                setProductQuantity(0);
                setProductAmount(0);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })
    }
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="text-center mt-5">ADD SALE ENTRY</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5 formBorder">
                            <form onSubmit={(e) => add_product(e)}>
                                    <div className="form-group p-2">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control" value={productName} onChange={(ev) => setProductName(ev.target.value)}/>
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Quantity</label>
                                        <input type="number" className="form-control" value={productQuantity} onChange={(ev) => setProductQuantity(ev.target.value)} />
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Amount</label>
                                        <input type="number" className="form-control" value={productAmount} onChange={(ev) => setProductAmount(ev.target.value)}/>
                                    </div>
                                    <div className="form-group p-2">
                                        <button type="submit" className="btn btn-primary formBtnSubmit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    );
}
// Export the AddSales component as the default export
export default AddSales;