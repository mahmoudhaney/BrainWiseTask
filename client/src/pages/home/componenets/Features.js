import React from 'react';
import './css/features.css'

const Features = () => {
    return (
        <div id="features" className="section-padding">
            <div className="container grid-3">
                <div className="feature">
                    <h4>Tell Us Your Idea</h4>
                    <p className="special-p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab
                    </p>
                </div>
    
                <div className="feature">
                    <h4>We Will Do All The Work</h4>
                    <p className="special-p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab
                    </p>
                </div>
    
                <div className="feature">
                    <h4>Your Product is Worldwide</h4>
                    <p className="special-p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;