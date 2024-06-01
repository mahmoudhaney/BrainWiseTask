import React from 'react';
import SideBar from '../../user/componenets/SideBar';
import UnapprovedTable from '../componenets/UnapprovedTable';

const UnapprovedUsers = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <UnapprovedTable />
        </div>
    );
};

export default UnapprovedUsers;