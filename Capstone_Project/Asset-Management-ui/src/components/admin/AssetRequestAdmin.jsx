import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AssetRequestAdmin = () => {
    const [assetRequest, setAssetRequest] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    const [reason, setReason] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [failureMsg, setFailureMsg] = useState("")
    const [tempNum, setTempNum] = useState(0)
    const [uploadAssetId, setUploadAssetId] = useState(null)
    const [uploadAssetName, setUploadAssetName] = useState('')
       

    let count = 0


    const api = 'http://localhost:8080/api/asset-request/pending-admin'
    const addApi = 'http://localhost:8080/api/asset-allocation/add/'
    const rejectApi = 'http://localhost:8080/api/asset-request/update-reject/'
    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        const getAllAssetRequest = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}`,
                config_details
            )
            setAssetRequest(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssetRequest()
    }, [currentPage, tempNum])

    const handleAllocation = (a) => {
        setUploadAssetId(a.id)
        setUploadAssetName(a.asset.name)
        setReason("")
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
    }

    const addAllocation = async () => {
        if (!reason) {
            setFailureMsg('Reason is mandotary.')
            return
        }
        setFailureMsg(undefined)
        setSuccessMsg(undefined)
        try {
            const body = {
                "remarks" : reason
            }
            await axios.post(addApi + uploadAssetId, body , config_details)
            setSuccessMsg('Request Approved successfully.')
            setTempNum(n => n + 1) // refresh list so image appears
            
            setTimeout(() => {
                const modalEl = document.getElementById('exampleModal')
                if (modalEl && window.bootstrap) {
                    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl)
                    modalInstance.hide()
                }
            }, 1200)
        } catch (err) {
            setUploadFailureMsg('Request failed. Please try again.')
            console.error('Request error', err)
        } 
    }

    const onReject = async (id) => {
         try {
            await axios.put(rejectApi + id, {} ,config_details)
            setTempNum(n => n + 1) 
            setDeleteMessage("Asset Reject Rejected.")
        }
        catch (err) { }

    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Asset Requests</h4>

                {/* <div className="d-flex align-items-center">
                    <label className="me-2 fw-bold">Filter:</label>

                    <select
                        className="form-select"
                        style={{ width: "180px" }}
                        // value={statusFilter}
                        // onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All</option>
                        <option value="IN_PROGRESS">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div> */}
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Approve</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {uploadAssetName && (
                                <p className="text-muted mb-3">
                                    Asset: <strong>{uploadAssetName}</strong>
                                </p>
                            )}
                            {
                                successMsg !== undefined ? <div class="alert alert-primary" >
                                    {successMsg}
                            </div> :""
                            }
                            {
                                failureMsg !== undefined ? <div class="alert alert-danger" >
                                    {failureMsg}
                            </div> :""
                            }
                            <div className="mb-4">
                                <label>Reason To Approve</label>
                                <textarea className="form-control" onChange={(e) => setReason(e.target.value)} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => addAllocation()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No</th>
                                    <th>Asset Name</th>
                                    <th>Asset Category Name</th>
                                    <th>Employee Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assetRequest?.map((a, index) => (
                                    <tr key={a.id ?? index}>
                                        <th scope="row">{index + 1 + currentPage * size}</th>
                                        <td>{a.asset.name}</td>
                                        <td>{a.asset.assetCategory.name}</td>
                                        <td>{a.employee.name}</td>
                                        <td>
                                            {
                                            (a.status === "IN_PROGRESS" )? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-outline-success me-1"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => handleAllocation(a)}
                                                    >
                                                        <i className="bi bi-check"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => onReject(a.id)}
                                                    >
                                                        <i className="bi bi-x"></i>
                                                    </button>
                                                </>
                                                ) : (
                                                    <span className="text-muted">
                                                        {(a.status === "APPROVED") ? 
                                                        <span className='badge bg-success '>APPROVED </span>
                                                        : <span className='badge bg-danger '> REJECTED</span>
                                                        }
                                                    </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
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

export default AssetRequestAdmin