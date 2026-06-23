import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AssetServiceRequest() {

    const [assetsService, setAssetsService] = useState([])
    const [deleteMsg, setDeleteMessage] = useState()

    const [tempNum, setTempNum] = useState(0)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-service/get-for-employee'
    const deleteApi = 'http://localhost:8080/api/asset-service/delete/'

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api,
                config_details
            )
            setAssetsService(response.data)
        }
        getAllAssets()
    }, [])

    const onDelete = async (id) => {
        try {
            await axios.delete(deleteApi + id, config_details)
            let tempArry = [...assetsService].filter(i => i.serviceId !== id)
            setAssetsService([...tempArry])
            setDeleteMessage("Asset Service Request deleted from the system.")
        }
        catch (err) { }
    }

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


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Asset Service Request  </h4>
                {
                    deleteMsg !== undefined ?
                        <div className="alert alert-danger mb-4">
                            {deleteMsg}
                        </div> : ""
                }
                <div className="d-flex g-3 align-items-center">
                    {/* Search */}
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by asset name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>&nbsp;

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
                    </div>&nbsp;

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
                    </div>&nbsp;

                    {/* Clear Button */}
                    <div className="col-md-2">
                        <button
                            className="btn btn-secondary w-100"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>&nbsp;
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
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((a, index) => (
                                <tr key={a.id ?? index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{(a.assetName)}</td>
                                    <td>{a.assetCategoryName}</td>
                                    <td>{a.status}</td>
                                    <td>
                                        {
                                            (a.status === "REJECTED" || a.status === "APPROVED") ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="btn btn-link p-0 text-decoration-none"
                                                    onClick={() => onDelete(a.serviceId)}
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
        </div>
    )
}

export default AssetServiceRequest;