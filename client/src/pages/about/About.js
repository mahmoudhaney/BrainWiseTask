import React from 'react';
import './css/about.css';
import image from '../../assets/images/about.png'

const About = () => {
    return (
        <div className="about section-padding">
            <div className="container">
                <h2 className="about-title section-title">About</h2>
                <div className="about-content">
                    <div className="about-img">
                        <img src={image} alt=""/>
                    </div>
                    <div className="about-text">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda similique 
                            fugiat rerum odit qui aut nisi maxime libero ab aliquam. Fugit non vitae porro dolor fugiat aliquam nemo odio ullam!
                        </p>
                        <hr/>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda similique fugiat
                            rerum odit qui aut nisi maxime libero ab aliquam. Fugit non vitae porro dolor fugiat aliquam nemo odio ullam!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;