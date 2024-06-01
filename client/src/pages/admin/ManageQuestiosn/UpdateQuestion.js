import React, { useState, useEffect, useRef} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';
import { useParams } from 'react-router-dom';

const UpdateQuestion = () => {
    let {id} = useParams();
    const auth = getAuthUser();
    
    const [question, setQuestion] = useState ({
        question: "",
        audio: null,
        loading: false,
        err: null,
        success: null,
        reload: false,
        success: null,
    });

    const audioFile = useRef(null);

    const UpdateQuestion = (e) => {
        e.preventDefault();
        setQuestion({ ...question, loading: true });

        const formData = new FormData();
        formData.append("question", question.question);
        if (audioFile.current.files && audioFile.current.files[0]) {
            formData.append("audio", audioFile.current.files[0]);
        }

        axios
            .put("http://localhost:5000/question/" + id, formData, {
                headers: {
                    token: auth.token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                // audioFile.current.value = null;
                setQuestion({ 
                    ...question,
                    loading: false,
                    err: null,
                    success: "Question Updated Successfully",
                    reload: question.reload + 1,
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

    useEffect(() => {
        axios
            .get("http://localhost:5000/question/" + id)
            .then((resp) => {
                audioFile.current.value = null;
                setQuestion({ 
                    ...question,
                    question: resp.data.question,
                    audio: resp.data.audio,
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
    }, [question.reload])

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Update Question</h1>

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

                    <Form onSubmit={UpdateQuestion}>
                        <audio controls className='w-100 mb-3'>
                            <source src={question.audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Question" required 
                            value={question.question}
                            onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <input type="file" className="form-control" ref={audioFile} />
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

export default UpdateQuestion;