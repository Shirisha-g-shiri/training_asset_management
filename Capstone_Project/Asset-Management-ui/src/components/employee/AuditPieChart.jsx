import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AuditPieChart = () => {
  const [assets, setAssets] = useState([]);

  const [statusCounts, setStatusCounts] = useState({
    BAD: 0,
    GOOD: 0,
    WORKING: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const api = "http://localhost:8080/api/asset-audit/all-emp";

  const configDetails = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // Fetch assets
  useEffect(() => {
    const getAllAssets = async () => {
      try {
        const response = await axios.get(api, configDetails);

        console.log("API Response:", response.data);

        // API returns array directly
        setAssets(response.data.data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    getAllAssets();
  }, []);

  // Count asset statuses and prepare chart
  useEffect(() => {
    const counts = {
        BAD: 0,
        GOOD: 0,
        WORKING: 0,
    };

    if (Array.isArray(assets)) {
      assets.forEach((asset) => {
        if (counts.hasOwnProperty(asset.assetCondition)) {
          counts[asset.assetCondition]++;
        }
      });
    }

    setStatusCounts(counts);

    setChartData({
      labels: [
        "BAD",
        "GOOD",
        "WORKING",
      ],
      datasets: [
        {
          data: [
            counts.BAD,
            counts.GOOD,
            counts.WORKING,
          ],
          backgroundColor: [
            "#dc3545",
            "#198754",
            '#ffc107',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [assets]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const statusItems = [
    {
      key: "BAD",
      label: "BAD",
      color: "#dc3545",
      textClass: "text-danger",
    },
    {
      key: "GOOD",
      label: "GOOD",
      color: "#198754",
      textClass: "text-success",
    },
    
    {
      key: "WORKING",
      label: "WORKING",
      color: "#ffc107",
      textClass: "text-warning",
    },
    
  ];

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Asset Request by Status</h5>
      </div>

      <div className="card-body">
        <div className="row h-100">

          {/* Left side status cards */}
          <div className="col-md-4 col-lg-3">
            <div className="row g-3">
              {statusItems.map((item) => (
                <div key={item.key} className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-3">

                      <div className="d-flex align-items-center mb-2">
                        <span
                          className="me-2"
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        />
                        <span className={`fw-bold ${item.textClass}`}>
                          {item.label}
                        </span>
                      </div>

                      <div className="fs-1 fw-bold ms-4">
                        {statusCounts[item.key]}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side chart */}
          <div className="col-md-8 col-lg-9 d-flex justify-content-center align-items-center">
            <div style={{ width: "100%", maxWidth: "450px" }}>
              <Chart
                type="doughnut"
                data={chartData}
                options={options}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuditPieChart;