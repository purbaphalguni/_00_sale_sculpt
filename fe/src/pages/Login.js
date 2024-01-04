// Import the styles from the 'Form.css' file
import './Form.css';
import axios from 'axios'
import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Functional component for login
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status == 200) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    const token_ = result.data.result.token;
                    const check = `Bearer ${token_}`;
                    console.log(check);
                    // Set Authorization header for subsequent requests
                    axios.defaults.baseURL = 'http://localhost:4000'; // Replace with your API endpoint
                    // Set Authorization header with access token from localStorage
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token_}`;
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/addsales');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
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
                                {loading ? <div className='col-md-12 mt-3 text-center'>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> : ''}
                                <h4 className="text-center mt-5">LOGIN FORM</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5 formBorder">
                                <form onSubmit={(e) => login(e)}>
                                    <div className="form-group p-2">
                                        <label>Email</label>
                                        <input type="email" className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(ev) => setPassword(ev.target.value)} />
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
// Export the Login component as the default export
export default Login;