import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';

const QuestionDetails = () => {

    let { id } = useParams();

    const [question, setQuestion] = useState ({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        setQuestion({ ...question, loading: true});
        axios
            .get("http://localhost/api/company/companies/" + id)
            .then((resp) => {
                setQuestion({ ...question, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setQuestion({ ...question, loading: false, err: "Something went wrong"});
            });
    }, []);

    return (
        <div className='row section-padding'>
            <div className="col-10 d-flex flex-column align-items-center">
                <h2 className='section-title' >Question Details</h2>

                {question.loading === true && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                )}

                {question.loading === false && question.err != null && (
                    <Alert variant="danger" className='w-100'>
                    {question.err}
                    </Alert>
                )}

                {question.loading === false && question.err == null && (
                    <Card className='w-50'>
                        <Card.Header className='bg-primary'>Question ID {question.result.ID}</Card.Header>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <b>Company: </b> {question.result.name}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <b>Departments: </b> {question.result.num_departments}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <b>Employees: </b> {question.result.num_employees}
                            </ListGroup.Item>

                            <Link to={"/admin/manage-questions/update/" + question.result.id}>
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

export default QuestionDetails;