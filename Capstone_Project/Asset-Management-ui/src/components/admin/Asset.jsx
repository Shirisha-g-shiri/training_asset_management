import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Asset = () => {
    const { id } = useParams();          // undefined → Add mode, truthy → Edit mode
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [category,setCategory] = useState([])


    const [assetStatus, setAssetStatus] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [name, setName] = useState("")
    const [assetNo, setAssetNo] = useState("")
    const [value, setValue] = useState("")
    const [model, setModel] = useState("")
    const [stock, setStock] = useState("")
    const [manufacturingDate, setManufacturingDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const [errMsgAssetStatus, setErrMsgAssetStatus] = useState()
    const [errMsgName, setErrMsgName] = useState()
    const [errMsgAssetNo, setErrMsgAssetNo] = useState()
    const [errMsgValue, setErrMsgValue] = useState()
    const [errMsgModel, setErrMsgModel] = useState()
    const [errMsgStock, setErrMsgStock] = useState()
    const [errMsgManufacturingDate, setErrMsgManufacturingDate] = useState()
    const [errMsgExpiryDate, setErrMsgExpiryDate] = useState()

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    // ── Load existing asset in edit mode ──────────────────────────────────────
    useEffect(() => {

        const fetchCategory = async () => {
            try{
                const res = await axios.get('http://localhost:8080/api/asset-category/all',config_details)
                setCategory(res.data)
                console.log(res)
                
            }catch (err){
                console.log(err)
                
            }
        }
        fetchCategory()

        if (!isEdit) return
        const fetchAsset = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/asset/get-one/${id}`,
                    config_details
                )
                const d = res.data
                setAssetStatus(d.assetStatus || '')
                setName(d.name || '')
                setAssetNo(d.assetNo || '')
                setValue(d.value || '')
                setModel(d.model || '')
                setStock(d.stock || '')
                setManufacturingDate(d.manufacturingDate ? d.manufacturingDate.slice(0, 10) : '')
                setExpiryDate(d.expiryDate ? d.expiryDate.slice(0, 10) : '')
                setSelectedCategory(d.assetCategory.id)
            } catch (err) {
                setErrMsg("Could not load asset. Check the ID and try again.")
                console.log(err)
            }
        }
        
        fetchAsset()
    }, [id])

    const saveAsset = async (e) => {
        e.preventDefault()

        let body = {
            'assetStatus': assetStatus,
            'name': name,
            'assetNo': assetNo,
            'value': value,
            'model': model,
            'stock': stock,
            'manufacturingDate': manufacturingDate ? manufacturingDate + "T00:00:00Z" : null,
            'expiryDate': expiryDate ? expiryDate + "T00:00:00Z" : null
        }
        console.log(body)

        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/api/asset/update/${id}`, body, config_details)
                setSuccessMsg("Asset Updated Successfully")
                setTimeout(() => navigate("/admin/assets"), 1200)
            } else {
                await axios.post(`http://localhost:8080/api/asset/add/${selectedCategory}`, body, config_details)
                setSuccessMsg("Asset Added Successfully")
                setAssetStatus('')
                setName('')
                setAssetNo('')
                setValue('')
                setModel('')
                setStock('')
                setManufacturingDate('')
                setExpiryDate('')
                setTimeout(() => navigate("/admin/assets"), 1200)
            }

            setErrMsg(undefined)

        } catch (err) {
            console.log(err)

            setErrMsg(
                "Save Failed " +
                (err.response?.data?.message || "")
            )
            setErrMsgAssetStatus(err.response?.data?.assetStatus || undefined)
            setErrMsgName(err.response?.data?.name || undefined)
            setErrMsgAssetNo(err.response?.data?.assetNo || undefined)
            setErrMsgValue(err.response?.data?.value || undefined)
            setErrMsgModel(err.response?.data?.model || undefined)
            setErrMsgStock(err.response?.data?.stock || undefined)
            setErrMsgManufacturingDate(err.response?.data?.manufacturingDate || undefined)
            setErrMsgExpiryDate(err.response?.data?.expiryDate || undefined)
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
                            onClick={() => navigate('/admin/assets')}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <h5 className="mb-0">
                            {isEdit ? "Edit Asset " : "Add Asset"}
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => saveAsset(e)}>
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
                                    <label>Asset Name: </label>
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
                                    <label>Asset No: </label>
                                    {
                                        errMsgAssetNo !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgAssetNo}
                                            </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setAssetNo(e.target.value)} value={assetNo} />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-4 mb-4">
                                    <label>Model: </label>
                                    {
                                        errMsgModel !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgModel}
                                            </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setModel(e.target.value)} value={model} />
                                </div>
                                <div className="col-4 mb-4">
                                    <label>Asset Category: </label>
                                    {
                                        errMsgAssetStatus !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgAssetStatus}
                                            </span> : ""
                                    }
                                    <select className="form-control" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                                        <option>---Select Category---</option>
                                        {
                                            category.map((t, index) => (
                                                <option key={index} value={t.id}>{t.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-4 mb-4">
                                    <label>Status: </label>
                                    {
                                        errMsgAssetStatus !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgAssetStatus}
                                            </span> : ""
                                    }
                                    
                                    <select className="form-control" required
                                        onChange={(e) => setAssetStatus(e.target.value)} value={assetStatus}>
                                        <option value="">Select Status</option>
                                        <option value="AVAILABLE">AVAILABLE</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="RETIRED">RETIRED</option>
                                        <option value="DISPOSED">DISPOSED</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Value (₹): </label>
                                    {
                                        errMsgValue !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgValue}
                                            </span> : ""
                                    }
                                    <input type="number" className="form-control" required
                                        onChange={(e) => setValue(e.target.value)} value={value} />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Stock (qty): </label>
                                    {
                                        errMsgStock !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgStock}
                                            </span> : ""
                                    }
                                    <input type="number" className="form-control" required
                                        onChange={(e) => setStock(e.target.value)} value={stock} />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Manufacturing Date: </label>
                                    {
                                        errMsgManufacturingDate !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgManufacturingDate}
                                            </span> : ""
                                    }
                                    <input type="date" className="form-control"
                                        onChange={(e) => setManufacturingDate(e.target.value)} value={manufacturingDate} />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Expiry Date: </label>
                                    {
                                        errMsgExpiryDate !== undefined ?
                                            <span style={{ color: 'red', fontSize: '11px' }}>
                                                {errMsgExpiryDate}
                                            </span> : ""
                                    }
                                    <input type="date" className="form-control"
                                        onChange={(e) => setExpiryDate(e.target.value)} value={expiryDate} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input type="submit" className="btn btn-primary"
                                    value={isEdit ? "Update Asset" : "Add Asset in System"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Asset