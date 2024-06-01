import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import {getAuthUser} from '../../../helper/Storage';

const auth = getAuthUser();

const AddUser = () => {
    const [employee, setEmployee] = useState({
        user: auth.id,
        company: "",
        department: "",
        designation: "",
        hired_on: "",
        loading: false,
        err: null,
        success: null,
    });

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");

    useEffect(() => {
        axios.get("http://localhost/api/company/companies/", {
            headers: {
                Authorization: `Bearer ${auth.access}`,
            },
        })
        .then(response => {
            setCompanies(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the companies!", error);
        });
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            axios.get(`http://localhost/api/company/companies/${selectedCompany}/departments/`, {
                headers: {
                    Authorization: `Bearer ${auth.access}`,
                },
            })
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the departments!", error);
            });
        }
    }, [selectedCompany]);

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
        setEmployee({ ...employee, company: e.target.value, department: "" });
    };

    const handleDepartmentChange = (e) => {
        setEmployee({ ...employee, department: e.target.value });
    };

    const handleDesignationChange = (e) => {
        setEmployee({ ...employee, designation: e.target.value });
    };

    const handleHiredOnChange = (e) => {
        setEmployee({ ...employee, hired_on: e.target.value });
    };

    const createEmployee = (e) => {
        e.preventDefault();
        setEmployee({ ...employee, loading: true, err: [] });

        axios.post("http://localhost/api/users/employees/", {
            user: employee.user,
            company: employee.company,
            department: employee.department,
            designation: employee.designation,
            hired_on: employee.hired_on,
        }, {
            headers: {
                Authorization: `Bearer ${auth.access}`,
            },
        })
        .then((resp) => {
            setEmployee({
                user: auth.id,
                company: "",
                department: "",
                designation: "",
                hired_on: "",
                loading: false,
                err: null,
                success: "Employee Created Successfully",
            });
            setDepartments([]);
        })
        .catch((errors) => {
            const errorResponse = errors.response.data;
            const errorMessages = Object.keys(errorResponse).map(key => `${key}: ${errorResponse[key].join(' ')}`);
            setEmployee({
                ...employee,
                loading: false,
                err: errorMessages,
                success: null,
            });
        });
    };

    return (
        <div className="row section-padding">
            <div className="col-6">
                <h1 className="section-title">Add Employee</h1>

                <div className="login">
                    {employee.err && employee.err.length > 0 && (
                        <Alert variant="danger">
                            {employee.err.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </Alert>
                    )}

                    {employee.success && (
                        <Alert variant="success">
                            {employee.success}
                        </Alert>
                    )}

                    <Form onSubmit={createEmployee}>
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control as="select" value={employee.company} onChange={handleCompanyChange} required>
                                <option value="">Select Company</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" value={employee.department} onChange={handleDepartmentChange} required>
                                <option value="">Select Department</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" placeholder="Designation" value={employee.designation} onChange={handleDesignationChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hired On</Form.Label>
                            <Form.Control type="date" value={employee.hired_on} onChange={handleHiredOnChange} />
                        </Form.Group>

                        <Button className="btn btn-dark w-100 mb-3" variant="primary" type="submit" disabled={employee.loading}>
                            {employee.loading ? 'Loading...' : 'Add Employee'}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
