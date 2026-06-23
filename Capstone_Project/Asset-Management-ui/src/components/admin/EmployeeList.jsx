import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../store/action/employeeAction";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees } = useSelector(state => state.employees);

    const [search, setSearch] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("")

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const onEdit = (id) => {
        navigate('/admin/edit-employee/' + id);
    }

    const handleClear = () => {
        setSearch("")
        setDepartmentFilter("")
    }

    // Get unique departments for filter dropdown
    const departments = [...new Set(employees.map(e => e.department).filter(Boolean))]

    // Client-side filter
    const filteredEmployees = employees.filter(e => {
        const matchesSearch = e.name?.toLowerCase().includes(search.toLowerCase()) ||
                              e.email?.toLowerCase().includes(search.toLowerCase())
        const matchesDept = departmentFilter === "" || e.department === departmentFilter
        return matchesSearch && matchesDept
    })

    return (
        <div className="card mb-4 shadow-sm">

            {/* ── Card Header ── */}
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Employees</h4>

                    <div className="d-flex align-items-center gap-2">
                        {/* Search */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '220px' }}
                        />

                        {/* Department Filter */}
                        <select
                            className="form-select w-auto"
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                        >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>

                        {/* Clear */}
                        <button className="btn btn-secondary" onClick={handleClear}>
                            Clear
                        </button>

                        {/* Add */}
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/admin/employee-onboard')}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Table ── */}
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>No of Assets</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-4">
                                        No employees found
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map((e, index) => (
                                    <tr key={e.id ?? index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{e.name || "N/A"}</td>
                                        <td>{e.department || "N/A"}</td>
                                        <td>{e.email || "N/A"}</td>
                                        <td>{e.mobileNo || "N/A"}</td>
                                        <td>{e.noOfAsset || "0"}</td>
                                        <td>
                                            <button
                                                className="btn btn-link p-0 text-decoration-none"
                                                title="Edit"
                                                onClick={() => onEdit(e.id)}
                                            >
                                                <i className="bi bi-pencil" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;