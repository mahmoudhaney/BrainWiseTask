import React from 'react';
import SideBar from '../componenets/SideBar';
import Result from '../componenets/Result';

const ExamResult = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <Result />
        </div>
    );
};

export default ExamResult;