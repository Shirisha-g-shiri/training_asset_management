import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyAssets() {

    const [myAssets, setMyAssets] = useState([])

    const [date, setDate] = useState("")
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [failureMsg, setFailureMsg] = useState(undefined)
    const [uploadAssetId, setUploadAssetId] = useState(null)
    const [uploadAssetName, setUploadAssetName] = useState('')

    const [description, setDescription] = useState("")
    const [issueType, setIssueType] = useState(undefined)
    const [serviceSuccessMsg, setServiceSuccessMsg] = useState(undefined)
    const [serviceFailureMsg, setServiceFailureMsg] = useState(undefined)
    const [serviceAssetId, setServiceAssetId] = useState(null)
    const [serviceAssetName, setServiceAssetName] = useState('')

    let count = 0

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-allocation/by-employee-login'
    const returnApi = 'http://localhost:8080/api/asset-allocation/'
    const serviceApi = 'http://localhost:8080/api/asset-service/add/'

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    // ─── Fetch paginated assets ───────────────────────────────────────────────
    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api,
                config_details
            )
            setMyAssets(response.data)
        }
        getAllAssets()
    }, [])

    const handleReturn = (a) => {
        setUploadAssetId(a.allocationId)
        setUploadAssetName(a.assetName)
        setDate(null)
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
    }

    const handleService = (a) => {
        setServiceAssetId(a.allocationId)
        setServiceAssetName(a.assetName)
        setDescription(null)
        setIssueType(null)
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
    }

    const onReturn = async () => {
        if (!date) {
            setFailureMsg('Date is mandotary.')
            return
        }
        setFailureMsg(undefined)
        setSuccessMsg(undefined)
        try {
            const body = {
                "return_date": date ? date + "T00:00:00Z" : null
            }
            await axios.put(returnApi + uploadAssetId, body, config_details)
            setSuccessMsg('Request created successfully.')

            setTimeout(() => {
                const modalEl = document.getElementById('exampleModal')
                if (modalEl && window.bootstrap) {
                    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl)
                    modalInstance.hide()
                }
            }, 1200)
        } catch (err) {
            setFailureMsg('Request failed. Please try again.')
            console.error('Request error', err)
        }
    }

    const onService = async () => {
        if (!description) {
            setServiceFailureMsg('Sescription is mandotary.')
            return
        }
        setServiceFailureMsg(undefined)
        setServiceSuccessMsg(undefined)
        try {
            const body = {
                "description": description,
                "issueType": issueType
            }
            await axios.post(serviceApi + serviceAssetId, body, config_details)
            setServiceSuccessMsg('Service created successfully.')

            setTimeout(() => {
                const modalEl = document.getElementById('serviceModal')
                if (modalEl && window.bootstrap) {
                    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl)
                    modalInstance.hide()
                }
                window.location.reload()
            }, 1200)
        } catch (err) {
            setServiceFailureMsg('Service failed. Please try again.')
            console.error('Service error', err)
        }
    }



    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">My Assets  </h4>
                <div className="d-flex g-3 align-items-center">

                    <select
                        className="form-select"
                    // value={statusFilter}
                    // onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="RETURNED">RETURNED</option>
                        <option value="HAVING">HAVING</option>
                    </select>&nbsp;
                    <button
                        className="btn btn-secondary w-100"
                    // onClick={() => {
                    //     setSearch("");
                    //     setStatusFilter("");
                    //     setSortOrder("");
                    // }}
                    >
                        Clear
                    </button>&nbsp;
                </div>
            </div>
            <br />

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Return Asset</h1>
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
                                </div> : ""
                            }
                            {
                                failureMsg !== undefined ? <div class="alert alert-danger" >
                                    {failureMsg}
                                </div> : ""
                            }
                            <div className="mb-4">
                                <label>Reason To Request</label>
                                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => onReturn()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="serviceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Service Asset</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {serviceAssetName && (
                                <p className="text-muted mb-3">
                                    Asset: <strong>{serviceAssetName}</strong>
                                </p>
                            )}
                            {
                                serviceSuccessMsg !== undefined ? <div class="alert alert-primary" >
                                    {serviceSuccessMsg}
                                </div> : ""
                            }
                            {
                                serviceFailureMsg !== undefined ? <div class="alert alert-danger" >
                                    {serviceFailureMsg}
                                </div> : ""
                            }
                            <div className="mb-4">
                                <label>Issue Type</label>
                                <select className="form-control" required
                                    onChange={(e) => setIssueType(e.target.value)} value={issueType}>
                                    <option value="">Select Issue Type</option>
                                    <option value="MALFUNCTION">MALFUNCTION</option>
                                    <option value="REPAIR">REPAIR</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>Description</label>
                                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => onService()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>S.No</th>
                                <th>Asset Name</th>
                                <th>Asset Category Name</th>
                                <th>Status</th>
                                <th>Return</th>
                                <th>Service Need</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAssets.map((a, index) => (
                                <tr key={a.id ?? index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{a.assetName}</td>
                                    <td>{a.assetCategoryName}</td>
                                    <td>{a.allocationStatus}</td>
                                    <td>
                                        {
                                            (a.returnDate === null)
                                                ? (
                                                    <button
                                                        className="btn btn-sm btn-danger text-white ms-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => handleReturn(a)}
                                                    >
                                                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                                                        RETURN
                                                    </button>
                                                )
                                                : "RETURNED"
                                        }

                                    </td>
                                    <td>
                                        {
                                            (a.returnDate === null && a.isService === false)
                                                ? (
                                                    <button
                                                        className="btn btn-sm btn-warning text-white ms-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#serviceModal"
                                                        onClick={() => handleService(a)}
                                                    >
                                                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                                                        Service Needed
                                                    </button>
                                                )
                                                : (a.returnDate === null ) ? 
                                                <span className="badge bg-warning"> Service in progress</span>
                                                :""
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}

export default MyAssets;