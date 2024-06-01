import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {getAuthUser} from '../../../helper/Storage';

const QuestionsTable = () => {
    const auth = getAuthUser();

    const [search, setSearch] = useState ("");
    const [questions, setQuestions] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setQuestions({ ...questions, loading: true});
        axios
            .get("http://localhost/api/company/companies/", {
                headers: { Authorization: `Bearer ${auth.access}`, },
            })
            .then((resp) => {
                setQuestions({ ...questions, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setQuestions({ ...questions, loading: false, err: "Something went wrong"});
            });
    }, [questions.reload]);

    const searchQuestions = (e) => {
        e.preventDefault();
        setQuestions({ ...questions, reload: questions.reload + 1});
    }

    const deleteQuestion = (question_id) => {
        axios
            .delete("http://localhost/api/company/companies/" + question_id, {
                headers: { Authorization: `Bearer ${auth.access}`, }
            })
            .then((resp) => {
                setQuestions({ ...questions, reload: questions.reload + 1, err: null})
            })
            .catch((err) => {
                setQuestions({ ...questions, loading: false, err: "Something went wrong"});
            });
    };

    return (
        <div className="col-7">
            {questions.loading === true && (
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

            {questions.loading === false && questions.err != null && (
                <Alert variant="danger">
                {questions.err}
                </Alert>
            )}

            {questions.loading === false && questions.err == null && questions.results.length === 0 && (
                <Alert variant="info">
                Not Found
                </Alert>
            )}

            {questions.loading === false && questions.err == null && (
                <>
                    <Link to={"/admin/manage-questions/add"} className="btn btn-success mb-3">
                    Add New Company +
                    </Link>

                    <Form onSubmit={searchQuestions}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control className='rounded-0' type="text" placeholder="Search Questions"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button className="btn btn-dark rounded-0" variant="primary" type="submit">
                                Search
                            </Button>
                        </Form.Group>
                    </Form>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Departments</th>
                                <th>Employees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.results.map((question) => (
                                <tr key={question.id}>
                                    <td>{question.name}</td>
                                    <td>{question.num_departments}</td>
                                    <td>{question.num_employees}</td>
                                    <td>
                                        <Link to={"/admin/manage-questions/" + question.id} className="btn btn-sm btn-info"> Show </Link>
                                        <Link to={"/admin/manage-questions/update/" + question.id} className="btn btn-sm btn-primary mx-2"> Update </Link>
                                        <button className="btn btn-sm btn-danger" onClick={(e) => {deleteQuestion(question.id)}}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )} 
        </div>
    );
};

export default QuestionsTable;