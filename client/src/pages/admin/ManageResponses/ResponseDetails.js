import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';

const ResponseDetails = () => {
    let { id } = useParams();

    const [response, setResponse] = useState ({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        setResponse({ ...response, loading: true});
        axios
            .get("http://localhost/api/company/departments/" + id)
            .then((resp) => {
                setResponse({ ...response, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setResponse({ ...response, loading: false, err: "Something went wrong"});
            });
    }, []);

    return (
        <div className='row section-padding'>
            <div className="col-10 d-flex flex-column align-items-center">
                <h2 className='section-title' >Question Details</h2>

                {response.loading === true && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                )}

                {response.loading === false && response.err != null && (
                    <Alert variant="danger" className='w-100'>
                    {response.err}
                    </Alert>
                )}

                {response.loading === false && response.err == null && (
                    <Card className='w-50'>
                        <Card.Header className='bg-primary'>Response ID {response.result.ID}</Card.Header>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                            <b>Department: </b> {response.result.name}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <b>Employees: </b> {response.result.num_employees}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <b>Company: </b> {response.result.company}
                            </ListGroup.Item>
                            
                            <Link to={"/admin/manage-responses/update/" + response.result.id}>
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

export default ResponseDetails;