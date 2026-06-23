import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AssetServiceRequestAdmin() {

    const [assetsService, setAssetsService] = useState([])
    const [deleteMsg, setDeleteMessage] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    const [tempNum, setTempNum] = useState(0)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-service/all'
    const update = 'http://localhost:8080/api/asset-service/'

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}`,
                config_details
            )
            setAssetsService(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssets()
    }, [currentPage, tempNum])



    const handleClear = () => {
        setSearch("")
        setStatusFilter("")
        setSortOrder("")
        setCurrentPage(0)
    }

    const filteredData = assetsService
        .filter(a => {
            const matchesSearch = a.assetName?.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === "" || a.status === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            if (sortOrder === "asc") return a.serviceId - b.serviceId   // oldest = lower id
            if (sortOrder === "desc") return b.serviceId - a.serviceId  // newest = higher id
            return 0
        })

    const onUpdate = async (id, status) => {
        try {
            await axios.put(update + id + `?status=${status}`, {}, config_details)
            setTempNum(n => n + 1)
            setDeleteMessage(`Asset Service Request ${status}.`)
        }
        catch (err) { }

    }


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Assets Service Request</h4>
                {
                    deleteMsg !== undefined ?
                        <div className="alert alert-danger mb-4">
                            {deleteMsg}
                        </div> : ""
                }
                <div className="row g-3 align-items-center">
                    {/* Search */}
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by asset name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filter */}
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Sort by Date</option>
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>

                    {/* Clear Button */}
                    <div className="col-md-2">
                        <button
                            className="btn btn-secondary w-100"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <br />


            {/* <div className="card mb-4"> */}
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No</th>
                                    <th>Asset Name</th>
                                    <th>Asset Category Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assetsService?.map((a, index) => (
                                    <tr key={a.id ?? index}>
                                        <th scope="row">{index + 1 + currentPage * size}</th>
                                        <td>{(a.asset.name)}</td>
                                        <td>{a.asset.assetCategory.name}</td>
                                        <td>{(a.status === "IN_PROGRESS") ?
                                                <span className='badge bg-warning '>IN PROGRESS </span> :
                                                (a.status === "APPROVED") ?
                                                <span className='badge bg-success '>APPROVED </span> : 
                                                <span className='badge bg-danger '> REJECTED</span>
                                         }</td>
                                        <td>
                                            {
                                                (a.status === "IN_PROGRESS") ? (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-outline-success me-1"
                                                            onClick={() => onUpdate(a.id, "APPROVED")}
                                                        >
                                                            <i className="bi bi-check"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => onUpdate(a.id, "REJECTED")}
                                                        >
                                                            <i className="bi bi-x"></i>
                                                        </button>
                                                    </>
                                                ) : (
                                                    " "
                                                )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/* </div> */}
            {/* ── Pagination ── */}
            <nav aria-label="Asset pagination">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li
                            className={`page-item ${currentPage === index ? 'active' : ''}`}
                            key={index}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AssetServiceRequestAdmin;