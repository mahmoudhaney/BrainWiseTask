import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {getAuthUser} from '../../../helper/Storage';

const UnapprovedTable = () => {
    const auth = getAuthUser();

    const [search, setSearch] = useState ("");
    const [users, setUsers] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setUsers({ ...users, loading: true});
        axios
            .get("http://localhost:5000/auth/unapproved-users", {params: {search: search,},})
            .then((resp) => {
                setUsers({ ...users, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setUsers({ ...users, loading: false, err: "Something went wrong"});
            });
    }, [users.reload]);

    const searchResponses = (e) => {
        e.preventDefault();
        setUsers({ ...users, reload: users.reload + 1});
    }

    const approveUser = (user_id) => {
        axios
            .put("http://localhost:5000/auth/approve-user/" + user_id, {
                headers: {token: auth.token,},
            })
            .then((resp) => {
                setUsers({ ...users, reload: users.reload + 1, err: null})
            })
            .catch((err) => {
                setUsers({ ...users, loading: false, err: err.respnse.data.msg});
            });
    };

    return (
        <div className="col-7">
            {users.loading === true && (
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

            {users.loading === false && users.err != null && (
                <Alert variant="danger">
                {users.err}
                </Alert>
            )}

            {users.loading === false && users.err == null && users.results.length === 0 && (
                <Alert variant="info">
                Not Found
                </Alert>
            )}

            {users.loading === false && users.err == null && (
                <>
                    <Link to={"/admin/manage-users/add"} className="btn btn-success mb-3">
                    Add New User +
                    </Link>

                    <Form onSubmit={searchResponses}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control className='rounded-0' type="text" placeholder="Search Responses"
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
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.results.map((user) => (
                                <tr key={user.ID}>
                                    <td>{user.ID}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link to={"/admin/manage-users/" + user.ID} className="btn btn-sm btn-info"> Show </Link>
                                        <button className="btn btn-sm btn-success" onClick={(e) => {approveUser(user.ID)}}> Approve </button>
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

export default UnapprovedTable;