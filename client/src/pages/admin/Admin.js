import React from 'react';
import SideBar from '../user/componenets/SideBar';
import Profile from './componenets/Profile';

const Admin = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <h1 className="section-title">Admin Profile</h1>
            <SideBar/>
            <Profile/>
        </div>
    );
};

export default Admin;