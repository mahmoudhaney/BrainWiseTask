import React from 'react';
import './style/Header.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/images/logo.png'
import { removeAuthUser, getAuthUser } from '../helper/Storage';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();

    const Logout = () => {
        removeAuthUser();
        navigate("/");
    };

    return (
        <header>
            <div className="container">
                <div className='logo'>
                    <Link to={"/"}>
                        <h3>Eeary</h3>
                        <img src={logo} alt="LOGO" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                        {!auth && (
                            <li><Link to={'/login'}>Login</Link></li>
                        )}
                        {auth && (
                            <li><Nav.Link onClick={Logout} className='HeaderLogout'>Logout</Nav.Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;