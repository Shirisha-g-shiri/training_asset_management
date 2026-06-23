import axios from "axios"
import { useEffect, useState } from "react"
import StatsCard from '../StatsCard';
import AssetPieChart from "./AssetPieChart";
import AssetBarChart from "./AssetBarChart";

// import IncidentBarChart from "./IncidentBarChart";
const Widget = () => {
    const statApi = "http://localhost:8080/api/admin/stats"
    const [label,setLabel] = useState([])
    const [data,setData] = useState([])

    useEffect(() => {
        // Prepare the header 
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
        <h3 className="mb-4">Admin Dashboard</h3>
        
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <StatsCard
              title="Total Assets"
              value={data.length > 0? data[0]: 0 }
              icon="bi-box-seam"
              color="primary"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <StatsCard
              title="Total Employees"
              value={data.length > 1? data[1]: 0 }
              icon="bi-check-circle"
              color="success"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <StatsCard
              title="Pending Requests"
              value={data.length > 2? data[2]: 0 }
              icon="bi-person-check"
              color="info"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <StatsCard
              title="Under Repair"
              value={data.length > 3? data[3]: 0 }
              icon="bi-wrench"
              color="warning"
            />
          </div>
        </div>

        
        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-6">
            <AssetPieChart />
          </div>
          <div className="col-12 col-lg-6">
            <AssetBarChart />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12">
            {/* <RecentActivities userId={us} is_admin={role === 'ADMIN'} /> */}
          </div>
        </div>
      </div>
    )
}

export default Widget