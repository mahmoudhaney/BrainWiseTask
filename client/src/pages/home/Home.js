import React from 'react';
import Landing from './componenets/Landing';
import Features from './componenets/Features';
import Services from './componenets/Services';
import Tests from './componenets/Tests';

const Base = () => {
    return (
        <>
        <Landing/>
        <Features/>
        <Services/>
        <Tests/>
        </>
    );
};

export default Base;