import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import './css/sidebar.css'
import { Link } from 'react-router-dom';
import { removeAuthUser, getAuthUser } from '../../../helper/Storage';
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();

    const Logout = () => {
        removeAuthUser();
        navigate("/");
    };

    return (
        <ListGroup as="ul" className='side-bar col-3'>
            {auth && auth.is_staff === false && (
                <>
                    <ListGroup.Item as="li" active disabled>
                    User Profile
                    </ListGroup.Item>

                    <ListGroup.Item as="li">
                        <Link to={'/user/my-profile'}>My Profile</Link>
                    </ListGroup.Item>
                </>
            )}
            {auth && auth.is_staff === true && (
                <>
                    <ListGroup.Item as="li" active>
                        <Link to={'/admin/my-profile'}>Admin Profile</Link>
                    </ListGroup.Item>

                    <ListGroup.Item as="li">
                        <Link to={'/admin/manage-users'}>Manage Employees</Link>
                    </ListGroup.Item>

                    <ListGroup.Item as="li">
                        <Link to={'/admin/manage-questions'}>Manage Companies</Link>
                    </ListGroup.Item>

                    <ListGroup.Item as="li">
                        <Link to={'/admin/manage-responses'}>Manage Departments</Link>
                    </ListGroup.Item>
                </>
            )}
            <ListGroup.Item as="li">
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default SideBar;