import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    let {id} = useParams();
    const auth = getAuthUser();

    const [user, setUser] = useState ({
        name: "",
        email: "",
        password: "",
        phone: "",
        loading: false,
        err: null,
        success: null,
        reload: false,
        success: null,
    });

    const UpdateUser = (e) => {
        e.preventDefault();
        setUser({ ...user, loading: true });

        axios
            .put("http://localhost:5000/auth/" + id, 
            {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
            }, 
            {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setUser({ 
                    ...user,
                    loading: false,
                    err: null,
                    success: "User Updated Successfully",
                    reload: user.reload + 1,
                });
            })
            .catch((errors) => {
                setUser({ 
                    ...user,
                    loading: false,
                    err: "Something went wrong",
                    success: null,
                });
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/" + id)
            .then((resp) => {
                setUser({ 
                    ...user,
                    name: resp.data.name,
                    email: resp.data.email,
                    // password: resp.data.password,
                    phone: resp.data.phone,
                });
            })
            .catch((errors) => {
                setUser({ 
                    ...user,
                    loading: false,
                    err: "Something went wrong",
                    success: null,
                });
            });
    }, [user.reload])

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Update User</h1>

                <div className="login">
                    {user.err && (
                        <Alert variant="danger">
                        {user.err}
                        </Alert>
                    )}

                    {user.success && (
                        <Alert variant="success">
                        {user.success}
                        </Alert>
                    )}

                    <Form onSubmit={UpdateUser}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Your Name" required 
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Email" required 
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password"  
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Phone Number" required 
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                        </Form.Group>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                        Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;