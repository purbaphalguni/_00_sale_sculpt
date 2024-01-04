import { API_BASE_URL } from '../../src/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
const CONFIG_OBJ = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    credentials: 'include'
}
// Functional component for TodayTotalRevenue
const TodayTotalRevenue = () => {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const getTotalRevenue = async () => {
        const response = await axios.get(`${API_BASE_URL}/totalrevenue`, CONFIG_OBJ);
        //const response = await axios.get("http://localhost:4000/totalrevenue", CONFIG_OBJ);
        // const response = await fetch(`${API_BASE_URL}/totalrevenue`, {
        //     method: 'GET',
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": "Bearer " + localStorage.getItem("token")
        //     },
        //     credentials: 'include' // Add this line
        //   });
        // const response = await fetch("http://localhost:4000/totalrevenue", CONFIG_OBJ);
        console.log(response);
        if (response.status === 200) {
            // Extract totalRevenue from the JSON
            const { totalRevenue } = response.data;

            // Set the totalRevenue in the component's state
            setTotalRevenue(totalRevenue);
        } else if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: '401 occurred while getting all posts'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    useEffect(() => {
        getTotalRevenue();
    }, []);
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="text-center mt-5">TODAY TOTAL REVENUE IS&nbsp;
                                    <b>&#8377;{totalRevenue}</b>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
// Export the TodayTotalRevenue component as the default export
export default TodayTotalRevenue;