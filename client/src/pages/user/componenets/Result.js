import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';
import {getAuthUser} from '../../../helper/Storage';

const Result = () => {
    const auth = getAuthUser();

    const [examResult, setExamResult] = useState ({
        loading: true,
        result: null,
        err: null,
    });

    useEffect(() => {
        setExamResult({ ...examResult, loading: true});
        axios
            .put("http://localhost:5000/exam/result/" + auth.ID, 
            {
                headers: {token: auth.token,},
            })
            .then((resp) => {
                setExamResult({ ...examResult, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setExamResult({ ...examResult, loading: false, err: "Something went wrong"});
            });
    }, []);

    return (
        <div className='row section-padding'>
            <div className="col-10 d-flex flex-column align-items-center">
                <h2 className='section-title' >Exam Result</h2>

                {examResult.loading === true && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                )}

                {examResult.loading === false && examResult.err != null && (
                    <Alert variant="danger" className='w-100'>
                    {examResult.err}
                    </Alert>
                )}

                {examResult.loading === false && examResult.err == null && (
                    <Card className='w-50'>
                        <Card.Header className='bg-primary'>Exam Date {examResult.result.exam_date}</Card.Header>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                            Total Questions: {examResult.result.total_questions}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            Your Result: {examResult.result.result}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Result;