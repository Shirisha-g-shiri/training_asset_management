import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AssetCategoryList() {

    const [assetsCategory, setAssetsCategory] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [deleteMsg, setDeleteMessage] = useState()
    const [categories, setCategories] = useState([])

    const [tempNum, setTempNum] = useState(0)

    let count = 0

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/asset-category/all/v2'

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
            setAssetsCategory(response.data.data)
            setTotalPages(response.data.totalPages)
        }
        getAllAssets()
    }, [currentPage, tempNum])


    const addAssetCategory = async () => {
        navigate('/admin/add-assetCategory')
    }

    const onEdit = (id) => {
        navigate('/admin/edit-assetCategory/' + id)
        console.log('Edit asset', id)
    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Assets Category </h4>


                <div className="d-flex align-items-center ">
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        onClick={() => addAssetCategory()}
                    >
                        + Add
                    </button>

                </div>
            </div>



            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetsCategory.map((a, index) => (
                                <tr key={a.id ?? index}>
                                    <th scope="row">
                                        {index + 1 + currentPage * size}
                                    </th>
                                    <td className="text-start">{a.name}</td>
                                    <td className="text-start">{a.description}</td>
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

export default AssetCategoryList;