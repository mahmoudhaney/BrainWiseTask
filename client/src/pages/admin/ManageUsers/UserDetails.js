import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';

const UserDetails = () => {
    let { id } = useParams();

    const [user, setUser] = useState ({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        setUser({ ...user, loading: true});
        axios
            .get("http://localhost:5000/auth/" + id)
            .then((resp) => {
                setUser({ ...user, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setUser({ ...user, loading: false, err: "Something went wrong"});
            });
    }, []);

    return (
        <div className='row section-padding'>
            <div className="col-10 d-flex flex-column align-items-center">
                <h2 className='section-title' >User Details</h2>

                {user.loading === true && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                )}

                {user.loading === false && user.err != null && (
                    <Alert variant="danger" className='w-100'>
                    {user.err}
                    </Alert>
                )}

                {user.loading === false && user.err == null && (
                    <Card className='w-50'>
                        <Card.Header className='bg-primary'>User ID {user.result.ID}</Card.Header>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                            Name: {user.result.name}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            Email: {user.result.email}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            Phone: {user.result.phone}
                            </ListGroup.Item>
                            
                            <Link to={"/admin/manage-users/update/" + user.result.ID}>
                                <Button className="btn btn-primary w-100" variant="primary" type="submit">
                                    Update
                                </Button>
                            </Link>
                        </ListGroup>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default UserDetails;