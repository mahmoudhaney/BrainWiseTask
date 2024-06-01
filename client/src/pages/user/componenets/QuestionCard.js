import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Placeholder from 'react-bootstrap/Placeholder';
import Alert from "react-bootstrap/Alert";
import {getAuthUser} from '../../../helper/Storage';
import './css/QuestionCard.css';
import { useNavigate } from "react-router-dom";

const QuestionCard = () => {
    const auth = getAuthUser();
    const navigate = useNavigate();

    const [examQuestions, setExamQuestions] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setExamQuestions({ ...examQuestions, loading: true});
        axios
            .get("http://localhost:5000/exam")
            .then((resp) => {
                setExamQuestions({ ...examQuestions, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setExamQuestions({ ...examQuestions, loading: false, err: "Something went wrong"});
            });
    }, [examQuestions.reload]);

    const answerQuestion = (question_id, response_id) => {
        axios
            .post("http://localhost:5000/exam/question-response/" + question_id, 
            {
                response_id: response_id,
            }, 
            {
                headers: {token: auth.token,},
            })
            .then((resp) => {
                setExamQuestions({ ...examQuestions })
            })
            .catch((err) => {
                setExamQuestions({ ...examQuestions });
            });
    };

    const EndExam = () => {
        navigate("/user/result");
        // axios
        //     .post("http://localhost:5000/exam/result/" + auth.ID, 
        //     {
        //         headers: {token: auth.token,},
        //     })
        //     .then((resp) => {
        //         setExamQuestions({ ...examQuestions })
        //     })
        //     .catch((err) => {
        //         setExamQuestions({ ...examQuestions });
        //     });
    };

    return (
        <div className="col-7">
            {examQuestions.loading === true && (
                <div className="text-center mb-3">
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                    </Placeholder>
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                    </Placeholder>
                </div>
            )}

            {examQuestions.loading === false && examQuestions.err != null && (
                <Alert variant="danger">
                {examQuestions.err}
                </Alert>
            )}

            {examQuestions.loading === false && examQuestions.err == null && examQuestions.results.length === 0 && (
                <Alert variant="info">
                Not Found
                </Alert>
            )}

            {examQuestions.loading === false && examQuestions.err == null && (
                <Form className='TestForm' onSubmit={EndExam}>
                    {examQuestions.results.map((question) => (
                        <Form.Group key={question.ID} className="mb-4">
                            <audio controls className='w-50'>
                                <source src={question.audio} type="audio/ogg"/>
                                Your browser does not support the audio element.
                            </audio>
                            <Form.Label className='mb-2 mt-2'>{question.question}</Form.Label>
                            {question.responses.map((response) => (
                                <Form.Check key={response.ID} onClick={(e) => {answerQuestion(question.ID, response.ID)}} type='radio' id={response.ID} label={response.response} />
                            ))}
                        </Form.Group>
                    ))}
                    <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default QuestionCard;