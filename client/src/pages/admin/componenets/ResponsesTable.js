import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {getAuthUser} from '../../../helper/Storage';

const ResponsesTable = () => {
    const auth = getAuthUser();

    const [search, setSearch] = useState ("");
    const [responses, setResponses] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setResponses({ ...responses, loading: true});
        axios
            .get("http://localhost/api/company/departments/", {
                headers: { Authorization: `Bearer ${auth.access}`, },
            })
            .then((resp) => {
                setResponses({ ...responses, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setResponses({ ...responses, loading: false, err: "Something went wrong"});
            });
    }, [responses.reload]);

    const searchResponses = (e) => {
        e.preventDefault();
        setResponses({ ...responses, reload: responses.reload + 1});
    }

    const deleteResponse = (response_id) => {
        axios
            .delete("http://localhost/api/company/departments/" + response_id, {
                headers: { Authorization: `Bearer ${auth.access}`, }
            })
            .then((resp) => {
                setResponses({ ...responses, reload: responses.reload + 1, err: null})
            })
            .catch((err) => {
                setResponses({ ...responses, loading: false, err: "Something went wrong"});
            });
    };

    return (
        <div className="col-7">
            {responses.loading === true && (
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

            {responses.loading === false && responses.err != null && (
                <Alert variant="danger">
                {responses.err}
                </Alert>
            )}

            {responses.loading === false && responses.err == null && responses.results.length === 0 && (
                <Alert variant="info">
                Not Found
                </Alert>
            )}

            {responses.loading === false && responses.err == null && (
                <>
                    <Link to={"/admin/manage-responses/add"} className="btn btn-success mb-3">
                    Add New Department +
                    </Link>

                    <Form onSubmit={searchResponses}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control className='rounded-0' type="text" placeholder="Search Departments"
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Employees</th>
                                <th>Company</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.results.map((response) => (
                                <tr key={response.id}>
                                    <td>{response.id}</td>
                                    <td>{response.name}</td>
                                    <td>{response.num_employees}</td>
                                    <td>{response.company}</td>
                                    <td>
                                        <Link to={"/admin/manage-responses/" + response.id} className="btn btn-sm btn-info"> Show </Link>
                                        <Link to={"/admin/manage-responses/update/" + response.id} className="btn btn-sm btn-primary mx-2"> Update </Link>
                                        <button className="btn btn-sm btn-danger" onClick={(e) => {deleteResponse(response.id)}}> Delete </button>
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

export default ResponsesTable;