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

const AssetPieChart = () => {
  const [assets, setAssets] = useState([]);

  const [statusCounts, setStatusCounts] = useState({
    OUT_OF_STOCK: 0,
    AVAILABLE: 0,
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

  const api = "http://localhost:8080/api/asset/all";

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
        setAssets(response.data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    getAllAssets();
  }, []);

  // Count asset statuses and prepare chart
  useEffect(() => {
    const counts = {
      OUT_OF_STOCK: 0,
      AVAILABLE: 0,
    };

    if (Array.isArray(assets)) {
      assets.forEach((asset) => {
        if (asset.stock > 0) {
          counts.AVAILABLE++;
        }else {
          counts.OUT_OF_STOCK++;
        }
      });
    }

    setStatusCounts(counts);

    setChartData({
      labels: [
        "Out of stock",
        "Available",
      ],
      datasets: [
        {
          data: [
            counts.OUT_OF_STOCK,
            counts.AVAILABLE,
          ],
          backgroundColor: [
            "#dc3545",
            "#198754",
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
      key: "OUT_OF_STOCK",
      label: "Out of Stock",
      color: "#dc3545",
      textClass: "text-danger",
    },
    {
      key: "AVAILABLE",
      label: "Available",
      color: "#198754",
      textClass: "text-success",
    },
    
    
  ];

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Assets by Status</h5>
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

export default AssetPieChart;