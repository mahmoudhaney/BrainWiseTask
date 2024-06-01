import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';

const Profile = () => {
    const auth = getAuthUser();

    const [user, setUser] = useState ({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
        id_proof_number: "",
        loading: false,
        err: [],
        success: null,
        reload: false,
    });

    const UpdateUser = (e) => {
        e.preventDefault();
        setUser({ ...user, loading: true });

        axios
            .put("http://localhost/api/users/profile/", 
            {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                phone_number: user.phone_number,
                id_proof_number: user.id_proof_number,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${auth.access}`,
                },
            })
            .then((resp) => {
                setUser({ 
                    ...user,
                    loading: false,
                    err: [],
                    success: "User Updated Successfully",
                    reload: user.reload + 1,
                });
            })
            .catch((errors) => {
                let errorMessages = ["Something went wrong"];
                if (errors.response && errors.response.data) {
                    const errorData = errors.response.data;
                    errorMessages = Object.keys(errorData).map((key) => `${key}: ${errorData[key].join(", ")}`);
                }
                setUser({
                    ...user,
                    loading: false,
                    err: errorMessages,
                    success: null,
                });
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost/api/users/profile/",
            {
                headers: {
                    Authorization: `Bearer ${auth.access}`,
                },
            }
            )
            .then((resp) => {
                setUser({ 
                    ...user,
                    username: resp.data.username,
                    first_name: resp.data.first_name,
                    last_name: resp.data.last_name,
                    email: resp.data.email,
                    address: resp.data.address,
                    phone_number: resp.data.phone_number,
                    id_proof_number: resp.data.id_proof_number,
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
        <div className="col-6">
            <div className="login">
                {Array.isArray(user.err) && user.err.length > 0 && (
                    <Alert variant="danger">
                        <div>
                            {user.err.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    </Alert>
                )}

                {user.success && (
                    <Alert variant="success">
                    {user.success}
                    </Alert>
                )}

                <Form onSubmit={UpdateUser}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="User Name" required 
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="First Name" required 
                        value={user.first_name}
                        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Last Name" required 
                        value={user.last_name}
                        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" required 
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Address"  
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Phone Number"  
                        value={user.phone_number}
                        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="ID Proof" 
                        value={user.id_proof_number}
                        onChange={(e) => setUser({ ...user, id_proof_number: e.target.value })}
                        />
                    </Form.Group>

                    <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                    Update
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Profile;