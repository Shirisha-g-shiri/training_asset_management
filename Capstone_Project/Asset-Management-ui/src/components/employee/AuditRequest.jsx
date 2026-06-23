import axios from "axios";
import { use, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuditRequest() {

    const [assetsRequest, setAssetsRequest] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [deleteMsg, setDeleteMessage] = useState()
    const [categories, setCategories] = useState([])

    const [tempNum, setTempNum] = useState(0)

  

    let count = 0

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-audit/all-emp'
    const updateApi = 'http://localhost:8080/api/asset-audit/update/'

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    // ─── Fetch paginated assets ───────────────────────────────────────────────
    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}`,
                config_details
            )
            setAssetsRequest(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssets()
    }, [currentPage, tempNum])

    const updateCondition = async (id,condition) => {
        try {
            await axios.put(updateApi + id + `?condition=${condition}`,{}, config_details)
            alert("Audit request verfied successfully");

            window.location.reload();
        }
        catch (err) { 
            console.log(err);
            alert("Failed to verify audit request");
            
        }
    }




    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Audit Request  </h4>

                {
                    deleteMsg !== undefined ?
                        <div className="alert alert-danger mb-4">
                            {deleteMsg}
                        </div> : ""
                }
                <div className="d-flex g-3 align-items-center">

                </div>
            </div>
            <br />


            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>S.No</th>
                                <th>Asset Name</th>
                                <th>Asset Category Name</th>
                                <th>Allocated Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetsRequest.map((a, index) => (
                                <tr key={a.id ?? index}>
                                    <th scope="row">{index + 1 + currentPage * size}</th>
                                    <td>{a.asset.name}</td>
                                    <td>{a.asset.assetCategory.name}</td>
                                    <td>{(a.assetAllocation.allocatedDate).slice(0, 10)}</td>
                                    <td>{(a.auditStatus === "PENDING") ?
                                        <span className="badge bg-warning">PENDING</span> :
                                        <span className="badge bg-success">VERIFIED</span>
                                    }</td>
                                    <td>
                                        {
                                            (a.assetCondition === null) ? (
                                                <>
                                                    <button
                                                        className="btn btn-outline-success text-success"
                                                        title="GOOD"
                                                        onClick={() => updateCondition(a.id, "GOOD")}
                                                    >
                                                        <i className="bi bi-check-circle-fill"></i>
                                                        GOOD
                                                    </button>&nbsp;

                                                    <button
                                                        className="btn btn-outline-warning text-warning"
                                                        title="WORKING"
                                                        onClick={() => updateCondition(a.id, "WORKING")}
                                                    >
                                                        <i className="bi bi-tools"></i>
                                                        WORKING
                                                    </button>&nbsp;
                                                    <button
                                                        className="btn btn-outline-danger text-danger"
                                                        title="BAD"
                                                        onClick={() => updateCondition(a.id, "BAD")}
                                                    >
                                                        <i className="bi bi-x-circle-fill"></i>&nbsp;
                                                        BAD
                                                    </button>

                                                    
                                                </>
                                            ) : (
                                                (a.assetCondition === "GOOD") ?
                                                <span className="badge bg-success">GOOD</span> :
                                                 (a.assetCondition === "BAD") ?
                                                 <span className="badge bg-danger">BAD</span> :
                                                 <span className="badge bg-warning">WORKING</span> 
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

export default AuditRequest;