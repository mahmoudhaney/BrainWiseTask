import React from 'react';
import SideBar from '../componenets/SideBar';
import QuestionCard from '../componenets/QuestionCard';

const Test = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <QuestionCard/>
        </div>
    );
};

export default Test;