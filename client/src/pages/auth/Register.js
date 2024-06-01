import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link } from 'react-router-dom';
import './css/login.css';
import axios from "axios";
import { setAuthUser } from '../../helper/Storage';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [resiter, setRegister] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        loading: false,
        err: null,
        success: null,
    });

    const RegisterFunction = (e) => {
        e.preventDefault();
        setRegister({ ...resiter, loading: true, err: [] });
        axios
            .post("http://localhost:5000/auth/register", {
                email: resiter.email,
                password: resiter.password,
                name: resiter.name,
                phone: resiter.phone
            })
            .then((resp) => {
                setRegister({ ...resiter, loading: false, err: null, success: "Question Created Successfully", });
                navigate("/login");
            })
            .catch((errors) => {
                setRegister({ ...resiter, loading: false, err: "Something went wrong", });
            });
    };

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Registration Form</h1>

                <div className="login">
                    {resiter.err != null && (
                        <Alert variant="danger">
                        {resiter.err}
                        </Alert>
                    )} 

                    {resiter.success && (
                        <Alert variant="success">
                        {resiter.success}
                        </Alert>
                    )}

                    <Form onSubmit={RegisterFunction}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Your Name" required 
                            value={resiter.name}
                            onChange={(e) => setRegister({ ...resiter, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Email" required 
                            value={resiter.email}
                            onChange={(e) => setRegister({ ...resiter, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password" required 
                            value={resiter.password}
                            onChange={(e) => setRegister({ ...resiter, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Phone Number" required 
                            value={resiter.phone}
                            onChange={(e) => setRegister({ ...resiter, phone: e.target.value })}
                            />
                        </Form.Group>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit" disabled={resiter.loading === true}>
                        Register
                        </Button>

                        <Link to={'/login'}>
                            <Button className="btn btn-dark w-100" variant="primary" type="button">
                            Login
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;