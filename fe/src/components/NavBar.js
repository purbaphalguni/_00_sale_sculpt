// Importing styles from 'NavBar.css' file
import './NavBar.css'
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// React functional component for the navigation bar
const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer);
    const logout = () => {
        // To remove a value from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        // To clear all values from localStorage
        localStorage.clear();
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                {localStorage.getItem("token") == null ? <>
                    <NavLink className="navbar-brand text-light p-2" to="/">SALES APP</NavLink>
                </> : ''}
                {localStorage.getItem("token") != null ? <>
                    <NavLink className="navbar-brand text-light p-2" to="/todaytotalrevenue">SALES APP</NavLink>
                </> : ''}
                <button className="navbar-toggler btn-hamburger" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto p-2">
                        {localStorage.getItem("token") != null ? <>
                            <li className="nav-item active">
                                <NavLink className="nav-link text-light" to="/addsales">ADD SALES <span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/topsales">TOP 5 SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/todaytotalrevenue">TODAYS TOTAL REVENUE</NavLink>
                            </li>
                        </> : ''}
                        {localStorage.getItem("token") == null ? <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/login">LOGIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/register">REGISTER</NavLink>
                            </li>
                        </> : ''}
                        {localStorage.getItem("token") != null ? <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="#" onClick={() => logout()}>LOG OUT</NavLink>
                            </li>
                        </> : ''}
                    </ul>
                </div>
            </nav>
        </>
    );
}
// Export the NavBar component as the default export
export default NavBar;