import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AssetBarChart = () => {
  const [assets, setAssets] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Quantity",
        data: [],
        backgroundColor: "#0d6efd",
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

        console.log("Assets:", response.data);

        setAssets(response.data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    getAllAssets();
  }, []);

  // Calculate category stock totals
  useEffect(() => {
    const categoryCounts = {};

    if (Array.isArray(assets)) {
      assets.forEach((asset) => {
        const categoryName =
          asset.assetCategory?.name || "Uncategorized";

        // Add stock instead of counting records
        categoryCounts[categoryName] =
          (categoryCounts[categoryName] || 0) +
          (asset.stock || 0);
      });

      setChartData({
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            label: "Stock Quantity",
            data: Object.values(categoryCounts),
            backgroundColor: "#0d6efd",
          },
        ],
      });
    }
  }, [assets]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        title: {
          display: true,
          text: "Stock Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Asset Category",
        },
      },
    },
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Assets by Category (Stock)</h5>
      </div>

      <div className="card-body" style={{ height: "400px" }}>
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AssetBarChart;