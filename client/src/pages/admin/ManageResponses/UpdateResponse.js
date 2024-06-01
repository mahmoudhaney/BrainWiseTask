import React, { useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';
import { useParams } from 'react-router-dom';

const UpdateResponse = () => {
    let {id} = useParams();
    const auth = getAuthUser();

    const [response, setResponse] = useState ({
        response: "",
        is_correct: "",
        question_id: "",
        loading: false,
        err: null,
        success: null,
        reload: false,
        success: null,
    });

    const [questions, setQuestions] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    const UpdateResponse = (e) => {
        e.preventDefault();
        setResponse({ ...response, loading: true });

        axios
            .put("http://localhost:5000/response/" + id, 
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
                    ...response,
                    loading: false,
                    err: null,
                    success: "Response Updated Successfully",
                    reload: response.reload + 1,
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
        axios
            .get("http://localhost:5000/response/" + id)
            .then((resp) => {
                setResponse({ 
                    ...response,
                    response: resp.data.response,
                    is_correct: resp.data.is_correct,
                    question_id: resp.data.question_id,
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
                <h1 className="section-title">Update Response</h1>

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

                    <Form onSubmit={UpdateResponse}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Response" required 
                            value={response.response}
                            onChange={(e) => setResponse({ ...response, response: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Select aria-label="Correctness" className="mb-3"
                        value={response.is_correct}
                        onChange={(e) => setResponse({ ...response, is_correct: e.target.value })}>
                            <option disabled>Choose</option>
                            <option value="1"> Correct </option>
                            <option value="0"> Wrong   </option>
                        </Form.Select>

                        <Form.Select aria-label="Questions" className="mb-3" 
                        value={response.question_id}
                        onChange={(e) => setResponse({ ...response, question_id: e.target.value })}>
                            <option disabled>Choose a Question</option>
                            {questions.results.map((question) => (
                                <option key={question.ID} value={question.ID}>{question.question}</option>
                            ))}
                        </Form.Select>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                        Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UpdateResponse;