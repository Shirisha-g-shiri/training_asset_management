import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssetCategoryAddEdit = () => {
    const { id } = useParams();          // undefined → Add mode, truthy → Edit mode
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const [errMsgName, setErrMsgName] = useState()
    const [errMsgDescription, setErrMsgDescription] = useState()

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    // ── Load existing asset in edit mode ──────────────────────────────────────
    useEffect(() => {
        if (!isEdit) return
        const fetchAsset = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/asset-category/get-one/${id}`,
                    config_details
                )
                const d = res.data
                setName(d.name || '')
                setDescription(d.description || '')

            } catch (err) {
                setErrMsg("Could not load asset. Check the ID and try again.")
                console.log(err)
            }
        }

        fetchAsset()
    }, [id])

    const saveAssetCategory = async (e) => {
        e.preventDefault()

        let body = {
            'name': name,
            'description': description,
        }
        console.log(body)

        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/api/asset-category/update/${id}`, body, config_details)
                setSuccessMsg("Asset Category Updated Successfully")
                setTimeout(() => navigate("/admin/assetCategory"), 1200)
            } else {
                await axios.post(`http://localhost:8080/api/asset-category/add`, body, config_details)
                setSuccessMsg("Asset Category Added Successfully")
                setName('')
                setDescription('')
                setTimeout(() => navigate("/admin/assetCategory"), 1200)
            }

            setErrMsg(undefined)

        } catch (err) {
            console.log(err)

            setErrMsg(
                "Save Failed " +
                (err.response?.data?.message || "")
            )

            setErrMsgName(err.response?.data?.name || undefined)
            setErrMsgDescription(err.response?.data?.description || undefined)
            setSuccessMsg(undefined)
        }
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header d-flex align-items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => navigate('/admin/assetCategory')}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <h5 className="mb-0">
                            {isEdit ? "Edit Asset Category" : "Asset Category Onboarding"}
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => saveAssetCategory(e)}>
                            {
                                successMsg !== undefined ?
                                    <div className="alert alert-primary mb-4">
                                        {successMsg}
                                    </div> : ""
                            }
                            {
                                errMsg !== undefined ?
                                    <div className="alert alert-danger mb-4">
                                        {errMsg}
                                    </div> : ""
                            }

                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Asset Category Name: </label>
                                    {
                                        errMsgName !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgName}
                                            </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Asset Category Description: </label>
                                    {
                                        errMsgDescription !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgDescription}
                                            </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setDescription(e.target.value)} value={description} />
                                </div>
                            </div>



                            <div className="mb-4">
                                <input type="submit" className="btn btn-primary"
                                    value={isEdit ? "Update Asset Category" : "Add Asset Category in System"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetCategoryAddEdit