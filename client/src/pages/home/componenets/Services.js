import React from 'react';
import './css/services.css'

const Services = () => {
    return (
        <div id="services" className="section-padding">
            <div className="container">
                <h2 className="section-title">Services</h2>
                <div className="services-content grid-3">
                    <div className="col">
                        <div className="srv">
                            <i className="fa-solid fa-earth-asia"></i>
                            <div className="service-text">
                                <h3>Graphic Designk</h3>
                                <p className="special-p">
                                    Graphic design is the process of visual communication and 
                                    problem-solving using one or more of typography, photography and illustration.
                                </p>
                            </div>
                        </div>

                        <div className="srv">
                            <i className="fa-regular fa-gem"></i>
                            <div className="service-text">
                                <h3>Web Design</h3>
                                <p className="special-p">
                                    Web design encompasses many different skills and disciplines 
                                    in the production and maintenance of websites.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="srv">
                            <i className="fa-sharp fa-solid fa-globe"></i>
                            <div className="service-text">
                                <h3>UI & UX</h3>
                                <p className="special-p">
                                    Process of enhancing user satisfaction with a product by improving 
                                    the usability, accessibility, and pleasure provided in the interaction.
                                </p>
                            </div>
                        </div>

                        <div className="srv">
                            <i className="fa-solid fa-earth-asia"></i>
                            <div className="service-text">
                                <h3>Web Development</h3>
                                <p className="special-p">
                                    Web development is a broad term for the work involved in developing 
                                    a web site for the Internet or an intranet.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="srv-img">
                            <img src="https://picsum.photos/200/300" alt=""/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Services;