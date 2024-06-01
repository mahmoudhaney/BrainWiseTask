import React from 'react';
import SideBar from '../../user/componenets/SideBar';
import QuestionsTable from '../componenets/QuestionsTable';

const Questions = () => {
    return (
        <div className='row section-padding justify-content-around'>
            <SideBar/>
            <QuestionsTable/>
        </div>
    );
};

export default Questions;