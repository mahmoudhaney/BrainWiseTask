import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';

const AddResponse = () => {
    const auth = getAuthUser();

    const [response, setResponse] = useState ({
        response: "",
        is_correct: "",
        question_id: "",
        loading: false,
        err: null,
        success: null,
    });

    const [questions, setQuestions] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    const CreateResponse = (e) => {
        e.preventDefault();
        setResponse({ ...response, loading: true, err: [] });

        axios
            .post("http://localhost:5000/response", 
            {
                response: response.response,
                is_correct: response.is_correct,
                question_id: response.question_id,
            },
            {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setResponse({ 
                    response: "",
                    is_correct: "",
                    question_id: "",
                    loading: false,
                    err: null,
                    success: "Response Created Successfully",
                });
            })
            .catch((errors) => {
                setResponse({ 
                    ...response,
                    loading: false,
                    err: "Something went wrong",
                    success: null,
                });
            });
    };

    useEffect(() => {
            setQuestions({ ...questions, loading: true});
            axios
                .get("http://localhost:5000/question")
                .then((resp) => {
                    setQuestions({ ...questions, results: resp.data, loading: false, err: null });
                })
                .catch((err) => {
                    setQuestions({ ...questions, loading: false, err: "Something went wrong"});
                });

    }, [response.reload])

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Add Response</h1>

                <div className="login">
                    {response.err && (
                        <Alert variant="danger">
                        {response.err}
                        </Alert>
                    )}

                    {response.success && (
                        <Alert variant="success">
                        {response.success}
                        </Alert>
                    )}

                    <Form onSubmit={CreateResponse}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Response" required 
                            value={response.response}
                            onChange={(e) => setResponse({ ...response, response: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Select aria-label="Correctness" className="mb-3"
                        value={response.is_correct}
                        onChange={(e) => setResponse({ ...response, is_correct: e.target.value })}>
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="1"> Correct </option>
                            <option value="0"> Wrong   </option>
                        </Form.Select>

                        <Form.Select aria-label="Questions" className="mb-3" 
                        value={response.question_id}
                        onChange={(e) => setResponse({ ...response, question_id: e.target.value })}>
                            <option value="" selected disabled hidden>Choose here</option>
                            {questions.results.map((question) => (
                                <option key={question.ID} value={question.ID}>{question.question}</option>
                            ))}
                        </Form.Select>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                        Add
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddResponse;