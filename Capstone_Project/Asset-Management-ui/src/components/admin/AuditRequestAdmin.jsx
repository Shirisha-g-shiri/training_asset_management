import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AuditRequestAdmin = () => {
    const [assetAllocation, setAssetAllocation] = useState([])
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


    const api = 'http://localhost:8080/api/asset-allocation/all'
    const addApi = 'http://localhost:8080/api/asset-audit/add/'
    const rejectApi = 'http://localhost:8080/api/asset-request/update-reject/'
    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        const getAllAssetAllocation = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}`,
                config_details
            )
            setAssetAllocation(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssetAllocation()
    }, [currentPage, tempNum])

    const handleAudit = async (asset)=>{
        try{
            await axios.post(addApi + asset.id , {} ,config_details)
            alert("Audit request created successfully");

            window.location.reload();
        }
        catch(err){
            console.log(err);
            alert("Failed to create audit request");
            
        }
    }


    

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Asset Audit</h4>
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
                                    <th>Allocated Date</th>
                                    <th>Employee Name</th>
                                    <th>Audit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assetAllocation?.map((a, index) => (
                                    <tr key={a.id ?? index}>
                                        <th scope="row">{index + 1 + currentPage * size}</th>
                                        <td>{a.asset.name}</td>
                                        <td>{a.asset.assetCategory.name}</td>
                                        <td>{(a.allocatedDate).slice(0,10)}</td>
                                        <td>{a.employee.name}</td>
                                        <td>
                                            {
                                            (a.status === "ALLOCATED" ) && (a.returnDate == null) && (a.audit === false)? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-warning me-1"
                                                        onClick={() => handleAudit(a)}
                                                    >
                                                        AUDIT
                                                    </button>
                                                   
                                                </>
                                                ) : 
                                                (a.audit === true) ?
                                                 (
                                                    <span className="text-muted">
                                                        <span className='badge bg-warning '>Audit in Progress</span>
                                                    </span>
                                                ) : (
                                                        <span className="text-muted">
                                                            <span className='badge bg-danger '>RETURNED </span>
                                                        </span>
                                                )
                                            }
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

export default AuditRequestAdmin