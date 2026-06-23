import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AssetList() {

    const [assets, setAssets] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [deleteMsg, setDeleteMessage] = useState()
    const [categories, setCategories] = useState([])

    const [tempNum, setTempNum] = useState(0)

    const [uploadAssetId, setUploadAssetId] = useState(null)
    const [uploadAssetName, setUploadAssetName] = useState('')
    const [file, setFile] = useState(null)
    const [uploadSuccessMsg, setUploadSuccessMsg] = useState()
    const [uploadFailureMsg, setUploadFailureMsg] = useState()
    const [uploading, setUploading] = useState(false)

    const [statusFilter,setStatusFilter] = useState("")
    const [sortOrder, setSortOrder] = useState("")


    let count = 0

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset/all/v2'
    const deleteApi = 'http://localhost:8080/api/asset/soft-delete/'
    const uploadApi = 'http://localhost:8080/api/asset/upload/'
    const addApi = 'http://localhost:8080/api/asset/add/'
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
            setAssets(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssets()
    }, [currentPage, tempNum ,statusFilter,sortOrder])

    const handleClear = () =>{
        setStatusFilter("")
        setSortOrder("")
    }

    //  Open upload modal
    const openUploadModal = (asset) => {
        setUploadAssetId(asset.id)
        setUploadAssetName(asset.name)
        setFile(null)
        setUploadSuccessMsg(undefined)
        setUploadFailureMsg(undefined)
    }

    //  File upload
    const onFileUpload = async () => {
        if (!file) {
            setUploadFailureMsg('Please select a file first.')
            return
        }
        setUploading(true)
        setUploadSuccessMsg(undefined)
        setUploadFailureMsg(undefined)
        try {
            const formData = new FormData()
            formData.append('file', file)
            await axios.put(uploadApi + uploadAssetId, formData, config_details)
            setUploadSuccessMsg('Image uploaded successfully.')
            setTempNum(n => n + 1) // refresh list so image appears

            setTimeout(() => {
                const modalEl = document.getElementById('uploadImageModal')
                if (modalEl && window.bootstrap) {
                    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl)
                    modalInstance.hide()
                }
            }, 1200)
        } catch (err) {
            setUploadFailureMsg('Upload failed. Please try again.')
            console.error('Upload error', err)
        } finally {
            setUploading(false)
        }
    }

    const addAsset = async () => {
        navigate('/admin/add-asset')
    }

    const onEdit = (id) => {
        navigate('/admin/edit-asset/' + id)
        console.log('Edit asset', id)
    }


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Assets  </h4>

                {/* Delete toast */}
                {deleteMsg && (
                    <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        {deleteMsg}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setDeleteMessage(undefined)}
                            aria-label="Close"
                        />
                    </div>
                )}

                {/* ── Filter / Add bar ── */}
                <div className="d-flex align-items-center gap-2">
                    
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                        <option value="AVAILABLE">AVAILABLE</option>
                    </select>
                    <select
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sort by Value</option>
                        <option value="LOW_TO_HIGH">Low to High</option>
                        <option value="HIGH_TO_LOW">High to Low</option>
                    </select>
                    <button
                            className="btn btn-secondary w-100"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => addAsset()}
                    >
                        Add
                    </button>
                </div>

            </div>


            <div
                className="modal fade"
                id="uploadImageModal"
                tabIndex="-1"
                aria-labelledby="uploadImageModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="uploadImageModalLabel">
                                Upload Image
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            {uploadAssetName && (
                                <p className="text-muted mb-3">
                                    Asset: <strong>{uploadAssetName}</strong>
                                </p>
                            )}

                            {uploadSuccessMsg && (
                                <div className="alert alert-success py-2">
                                    {uploadSuccessMsg}
                                </div>
                            )}
                            {uploadFailureMsg && (
                                <div className="alert alert-danger py-2">
                                    {uploadFailureMsg}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Select Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={e => {
                                        setFile(e.target.files[0] || null)
                                        setUploadSuccessMsg(undefined)
                                        setUploadFailureMsg(undefined)
                                    }}
                                />
                                <small className="text-muted">
                                    Accepted formats: JPG, PNG, GIF, WEBP
                                </small>
                            </div>

                            {/* Preview */}
                            {file && (
                                <div className="text-center mb-2">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Preview"
                                        className="img-thumbnail"
                                        style={{ maxHeight: '150px', objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onFileUpload}
                                disabled={uploading || !file}
                            >
                                {uploading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-1"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Uploading…
                                    </>
                                ) : (
                                    'Upload'
                                )}
                            </button>
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
                                <th>Img</th>
                                <th>Asset No</th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((a, index) => (
                                <tr key={a.id ?? index} className={a.stock <= 0 ? "table-danger" : ""} >
                                    <th scope="row">
                                        {index + 1 + currentPage * size}
                                    </th>

                                    {/* Image / Upload trigger */}
                                    <td>
                                        {a.idPath ? (
                                            <img
                                                src={`../../../asset/${a.idPath}`}
                                                alt={a.name}
                                                className="rounded"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                title="Upload image"
                                                data-bs-toggle="modal"
                                                data-bs-target="#uploadImageModal"
                                                onClick={() => openUploadModal(a)}
                                            >
                                                <i className="bi bi-image" />
                                            </button>
                                        )}
                                    </td>

                                    <td>{a.assetNo}</td>
                                    <td>{a.assetStatus}</td>
                                    <td>{a.name}</td>
                                    <td>{a.value}</td>
                                    <td>{a.stock}</td>
                                    <td>{a.assetCategory?.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            title="Edit"
                                            onClick={() => onEdit(a.id)}
                                        >
                                            <i className="bi bi-pencil" />
                                        </button>
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

export default AssetList;