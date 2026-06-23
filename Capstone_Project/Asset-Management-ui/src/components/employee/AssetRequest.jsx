import axios from "axios";
import { use, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AssetRequest() {

    const [assetsRequest, setAssetsRequest] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [deleteMsg, setDeleteMessage] = useState()
    const [categories, setCategories] = useState([])

    const [tempNum, setTempNum] = useState(0)

    const [statusFilter , setStatusFilter] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    
    let count = 0

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-request/all-emp'
    const deleteApi = 'http://localhost:8080/api/asset-request/delete/'
    
    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    // ─── Fetch paginated assets ───────────────────────────────────────────────
    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}&status=${statusFilter}&sort=${sortOrder}`,
                config_details
            )
            setAssetsRequest(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssets()
    }, [currentPage, tempNum ,statusFilter, sortOrder])

    const onDelete = async (id) => {
        try {
            await axios.delete(deleteApi + id, config_details)
            let tempArry = [...assetsRequest].filter(i => i.id !== id)
            setAssetsRequest([...tempArry])
            setDeleteMessage("Asset Request deleted from the system.")
        }
        catch (err) { }
    }
   

    

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Asset Request  </h4>
                
            {
                deleteMsg !== undefined ?
                    <div className="alert alert-danger mb-4">
                        {deleteMsg}
                    </div> : ""
            }
            <div className="d-flex g-3 align-items-center">
                

                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>&nbsp;

                    <select
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sort by Date</option>
                        <option value="NEWEST">Newest First</option>
                        <option value="OLDEST">Oldest First</option>
                    </select>&nbsp;
                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setStatusFilter("")
                            setSortOrder("")
                        }}
                    >
                        Clear
                    </button>&nbsp;
            </div>
            </div>
            <br/>
            
            
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No</th>
                                    <th>Request Date</th>
                                    <th>Asset Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assetsRequest.map((a, index) => (
                                    <tr key={a.id ?? index}>
                                        <th scope="row">{index + 1 + currentPage * size}</th>
                                        <td>{(a.requestDate).slice(0,10)}</td>
                                        <td>{a.asset.name}</td>
                                        <td>{(a.status === "REJECTED") ?
                                            <span className="badge bg-danger">REJECTED</span> :
                                            (a.status === "APPROVED") ?
                                             <span className="badge bg-success">APPROVED</span> :
                                             <span className="badge bg-warning">IN_PROGROSS</span>
                                        }</td>
                                        <td>
                                            {
                                            (a.status === "REJECTED" || a.status === "APPROVED") ? (
                                                ""
                                            ) : (
                                                    <button
                                                        className="btn btn-link p-0 text-decoration-none"
                                                        onClick={() => onDelete(a.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

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

export default AssetRequest;