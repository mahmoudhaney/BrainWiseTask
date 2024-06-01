import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import Alert from "react-bootstrap/Alert";
import {getAuthUser} from '../../../helper/Storage';

const HistoryTable = () => {
    const auth = getAuthUser();

    const [history, setHistory] = useState ({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setHistory({ ...history, loading: true});
        axios
            .get("http://localhost:5000/exam//history/" + auth.ID, {
                headers: {token: auth.token,},
            })
            .then((resp) => {
                setHistory({ ...history, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setHistory({ ...history, loading: false, err: "Something went wrong"});
            });
    }, [history.reload]);

    return (
        <div className="col-7">
            {history.loading === true && (
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

            {history.loading === false && history.err != null && (
                <Alert variant="danger">
                {history.err}
                </Alert>
            )}

            {history.loading === false && history.err == null && history.results.length === 0 && (
                <Alert variant="info">
                Not Found
                </Alert>
            )}

            {history.loading === false && history.err == null && (
                <>
                    <Link to={"/user/test"} className="btn btn-success mb-3">
                    Take New Test +
                    </Link>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Test Date</th>
                                <th>Total Questions</th>
                                <th>Your Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.results.map((exam) => (
                                <tr key={exam.ID}>
                                    <td>{exam.ID}</td>
                                    <td>{exam.exam_date}</td>
                                    <td>{exam.total_questions}</td>
                                    <td>{exam.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default HistoryTable;