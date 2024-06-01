import React from 'react';
import SideBar from '../../user/componenets/SideBar';
import UsersTable from '../componenets/UsersTable';

const Users = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <UsersTable/>
        </div>
    );
};

export default Users;