import React from 'react';
import SideBar from '../user/componenets/SideBar';
import Profile from '../admin/componenets/Profile';

const User = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <Profile/>
        </div>
    );
};

export default User;