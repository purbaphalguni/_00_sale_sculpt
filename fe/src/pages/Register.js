// Import the styles from the 'Form.css' file
import './Form.css';
import axios from 'axios'
import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Functional component for Register
const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const register = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { firstName: firstName, lastName: lastName, email, password }
        axios.post(`${API_BASE_URL}/register`, requestData)
            .then((result) => {
                if (result.status == 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                navigate('/login');
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
                            {loading ? <div className='col-md-12 mt-3 text-center'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                                <h4 className="text-center mt-5">REGISTRATION FORM</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5 formBorder">
                            <form onSubmit={(e) => register(e)}>
                                    <div className="form-group p-2">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} />
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Email</label>
                                        <input type="email" className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
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
// Export the Register component as the default export
export default Register;