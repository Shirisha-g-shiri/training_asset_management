import { Link } from "react-router-dom"
import StatsCard from "../StatsCard"
import { useEffect, useState } from "react"
import axios from "axios"
import AsseRequestPieChart from "./AssetRequestPieChart"
import AuditPieChart from "./AuditPieChart"
import AssetRequestPieChart from "./AssetRequestPieChart"

const EmployeeWidget = () => {
    const statApi = "http://localhost:8080/api/employee/stats"
    const [label,setLabel] = useState([])
    const [data,setData] = useState([])

    useEffect(() => {
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        const getStats = async () => {
            try{
                const response = await axios.get(statApi, config_details)
                setLabel(response.data.label)
                setData(response.data.count)
            }
            catch(err){
                console.log(err?.response)
            }
        }

        getStats()
    }, [])
    
    return (
        <div className="container-fluid py-4">
            <h3 className="mb-4">Employee Dashboard</h3>

            <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-md-3">
                    <StatsCard
                        title="My Assigned Assets"
                        value={data.length > 0? data[0]: 0 }
                        icon="bi-laptop"
                        color="primary"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <StatsCard
                        title="My Pending Asset Requests"
                       value={data.length > 1? data[1]: 0 }
                        icon="bi-clock"
                        color="warning"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <StatsCard
                        title="My Pending Service Requests"
                        value={data.length > 2? data[2]: 0 }
                        icon="bi-check-circle"
                        color="success"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <StatsCard
                        title="My Pending Audit Requests"
                        value={data.length > 3? data[3]: 0 }
                        icon="bi-check-circle"
                        color="danger"
                    />
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                    <AssetRequestPieChart />
                </div>
                <div className="col-12 col-lg-6">
                    <AuditPieChart />
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <Link to="/employee/browse-asset" className="card h-100 text-decoration-none">
                        <div className="card-body text-center py-5">
                            <i className="bi bi-box-seam" style={{ fontSize: '3rem' }}></i>
                            <h5 className="mt-3">Browse Assets</h5>
                            <p className="text-muted">View available assets</p>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-md-4">
                    <Link to="/employee/my-requests" className="card h-100 text-decoration-none">
                        <div className="card-body text-center py-5">
                            <i className="bi bi-arrow-repeat" style={{ fontSize: '3rem' }}></i>
                            <h5 className="mt-3">My Requests</h5>
                            <p className="text-muted">View your requests</p>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-md-4">
                    <Link to="/employee/my-assets" className="card h-100 text-decoration-none">
                        <div className="card-body text-center py-5">
                            <i className="bi bi-laptop" style={{ fontSize: '3rem' }}></i>
                            <h5 className="mt-3">My Assets</h5>
                            <p className="text-muted">View assigned assets</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EmployeeWidget