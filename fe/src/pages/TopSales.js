import {API_BASE_URL} from '../../src/config';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
// Functional component for TopSales
const TopSales = () => {
    const [allsales, setAllSales] = useState([]);
    var count = 0;
    const getAllSales = async () => {
        const response = await axios.get(`${API_BASE_URL}/topsales`,CONFIG_OBJ);

        if (response.status === 200) {
            console.log(response.data.topSales);
            setAllSales(response.data.topSales);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }
    useEffect(() => {
        getAllSales();
    }, []);
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="text-center mt-5">TOP 5 SALES</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="border-bottom text-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Sales Id:</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Sale Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allsales.map((sale) => {
                                                count++;
                                                return (
                                                    <tr key={sale._id}>
                                                        <th scope="row">{count}</th>
                                                        <td>{sale._id}</td>
                                                        <td>{sale.productName}</td>
                                                        <td>{sale.productQuantity}</td>
                                                        <td>{sale.salesAmount}</td>
                                                    </tr>
                                                );
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div></div>
                </div>
            </div>
        </>
    );
}
// Export the TopSales component as the default export
export default TopSales;