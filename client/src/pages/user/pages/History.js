import React from 'react';
import SideBar from '../componenets/SideBar';
import HistoryTable from '../componenets/HistoryTable';

const History = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <HistoryTable/>
        </div>
    );
};

export default History;