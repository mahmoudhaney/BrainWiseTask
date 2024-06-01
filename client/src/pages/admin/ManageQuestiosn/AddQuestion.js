import React, { useState, useRef} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';

const AddQuestion = () => {
    const auth = getAuthUser();

    const [question, setQuestion] = useState ({
        question: "",
        loading: false,
        err: null,
        success: null,
    });

    const audioFile = useRef(null);

    const CreateQuestion = (e) => {
        e.preventDefault();
        setQuestion({ ...question, loading: true, err: [] });

        const formData = new FormData();
        formData.append("question", question.question);
        if (audioFile.current.files && audioFile.current.files[0]) {
            formData.append("audio", audioFile.current.files[0]);
        }

        axios
            .post("http://localhost:5000/question", formData, {
                headers: {
                    token: auth.token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                audioFile.current.value = null;
                setQuestion({ 
                    question: "",
                    loading: false,
                    err: null,
                    success: "Question Created Successfully",
                });
            })
            .catch((errors) => {
                setQuestion({ 
                    ...question,
                    loading: false,
                    err: "Something went wrong",
                    success: null,
                });
            });
    };

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Add Question</h1>

                <div className="login">
                    {question.err && (
                        <Alert variant="danger">
                        {question.err}
                        </Alert>
                    )}

                    {question.success && (
                        <Alert variant="success">
                        {question.success}
                        </Alert>
                    )}
                    

                    <Form onSubmit={CreateQuestion}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Question" required 
                            value={question.question}
                            onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <input type="file" className="form-control" required ref={audioFile} />
                        </Form.Group>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit">
                        Add
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;