import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BrowseAsset = () => {
    const [assets, setAssets] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size] = useState(8)
    const [totalPages, setTotalPages] = useState(0)
    const [tempNum, setTempNum] = useState(0)

    // Modal states
    const [reason, setReason] = useState("")
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [failureMsg, setFailureMsg] = useState(undefined)
    const [uploadAssetId, setUploadAssetId] = useState(null)
    const [uploadAssetName, setUploadAssetName] = useState('')

    const [category,setCategory] = useState([])

    // Filter states
    const [search, setSearch] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const api = 'http://localhost:8080/api/asset/all/v2'
    const addApi = 'http://localhost:8080/api/asset-request/add/'
    const config_details = {
        headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
    }


    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get(
                'http://localhost:8080/api/asset-category/all',  // adjust to your actual endpoint
                config_details
            )
            setCategory(response.data)
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getAllAssets = async () => {
            const response = await axios.get(
                api + `?page=${currentPage}&size=${size}&status=${statusFilter}&sort=${sortOrder}&categoryId=${categoryId}`,
                config_details
            )
            setAssets(response.data.data)
            setTotalPages(response.data.totalPages)
        }

        
        getAllAssets()
    }, [currentPage, sortOrder,statusFilter,categoryId])

    const handleRequest = (asset) => {
        setUploadAssetId(asset.id)
        setUploadAssetName(asset.name)
        setReason("")
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
    }

    const addRequest = async () => {
        if (!reason) {
            setFailureMsg('Reason is mandatory.')
            return
        }
        setFailureMsg(undefined)
        setSuccessMsg(undefined)
        try {
            await axios.post(addApi + uploadAssetId, { remarks: reason }, config_details)
            setSuccessMsg('Request created successfully.')
            setTempNum(n => n + 1)
            setTimeout(() => {
                const modalEl = document.getElementById('requestModal')
                if (modalEl && window.bootstrap) {
                    window.bootstrap.Modal.getOrCreateInstance(modalEl).hide()
                }
            }, 1200)
        } catch (err) {
            setFailureMsg('Request failed. Please try again.')
            console.error('Request error', err)
        }
    }

    const filteredAssets = assets.filter(a =>
        a.name?.toLowerCase().includes(search.toLowerCase())
    )

    const handleClear = () => {
        setSearch("")
        setCategoryId("")
        setStatusFilter("")
        setSortOrder("")
        setCurrentPage(0)
    }

    return (
        <div className="card mb-4 shadow-sm">

            {/* ── Modal ── */}
            <div className="modal fade" id="requestModal" tabIndex="-1" aria-labelledby="requestModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="requestModalLabel">
                                <i className="bi bi-box-seam me-2" />
                                Asset Request
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {uploadAssetName && (
                                <p className="text-muted mb-3">
                                    Requesting: <strong>{uploadAssetName}</strong>
                                </p>
                            )}
                            {successMsg && <div className="alert alert-success">{successMsg}</div>}
                            {failureMsg && <div className="alert alert-danger">{failureMsg}</div>}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Reason <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    placeholder="Enter your reason for requesting this asset..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={addRequest}>
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Card Header ── */}
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h4 className="mb-0">Browse Assets</h4>

                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        {/* Search */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            style={{ width: '200px' }}
                        />

                        {/* Category Filter */}
                       
                         <select
                            className="form-select w-auto"
                            value={categoryId}
                            onChange={(e) => { setCategoryId(e.target.value) }}
                        >
                            <option>---All Category---</option>
                            {
                                category.map((t, index) => (
                                    <option key={index} value={t.id}>{t.name}</option>
                                ))
                            }
                        </select>

                        {/* Stock Filter */}
                        <select
                            className="form-select w-auto"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value) }}
                        >
                            <option value="">All Stock</option>
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                        </select>
                        <select
                            className="form-select w-auto"
                            value={sortOrder}
                            onChange={(e) => { setSortOrder(e.target.value)}}
                        >
                            <option value="">Sort by Value</option>
                            <option value="LOW_TO_HIGH">Low to High</option>
                            <option value="HIGH_TO_LOW">High to Low</option>
                        </select>

                        {/* Clear */}
                        <button className="btn btn-secondary" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Asset Cards ── */}
            <div className="card-body">
                {filteredAssets.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        <i className="bi bi-inbox fs-1 d-block mb-2" />
                        <p className="mb-0">No assets found</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredAssets.map((asset) => (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={asset.id}>
                                <div className="card h-100 shadow-sm border-0">

                                    {/* Image */}
                                    {asset.idPath ? (
                                        <img
                                            src={`../../../asset/${asset.idPath}`}
                                            alt={asset.name}
                                            className="card-img-top"
                                            style={{ height: '160px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div
                                            className="card-img-top bg-light d-flex justify-content-center align-items-center"
                                            style={{ height: '160px' }}
                                        >
                                            <i className="bi bi-box-seam text-secondary" style={{ fontSize: '2.5rem' }} />
                                        </div>
                                    )}

                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title fw-bold mb-1">{asset.name}</h6>

                                        <p className="text-muted small mb-2">
                                            <i className="bi bi-tag me-1" />
                                            {asset.assetCategory?.name || "Uncategorized"}
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className={`badge ${asset.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                                {asset.value}
                                            </span>
                                            <span className={`badge ${asset.stock > 0 ? 'bg-info text-dark' : 'bg-danger'}`}>
                                                Stock: {asset.stock || 0}
                                            </span>
                                        </div>

                                        <div className="mt-auto">
                                            {(asset.stock || 0) <= 0 ? (
                                                <button className="btn btn-outline-secondary w-100" disabled>
                                                    <i className="bi bi-exclamation-circle me-1" />
                                                    Out of Stock
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary w-100"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#requestModal"
                                                    onClick={() => handleRequest(asset)}
                                                >
                                                    <i className="bi bi-plus-circle me-1" />
                                                    Request Asset
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Pagination ── */}
            <div className="card-footer bg-transparent">
                <nav aria-label="Asset pagination">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item">
                            <button className="page-link" disabled={currentPage === 0}
                                onClick={() => setCurrentPage(p => p - 1)}>
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => setCurrentPage(index)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button className="page-link" disabled={currentPage === totalPages - 1}
                                onClick={() => setCurrentPage(p => p + 1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default BrowseAsset