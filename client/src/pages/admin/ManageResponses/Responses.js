import React from 'react';
import SideBar from '../../user/componenets/SideBar';
import ResponsesTable from '../componenets/ResponsesTable';

const Responses = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <ResponsesTable/>
        </div>
    );
};

export default Responses;