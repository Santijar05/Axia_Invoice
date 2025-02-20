"use client"

import { Line } from "react-chartjs-2"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function SalesCharts() {
  const months = ["March", "Spring", "May", "Summer 25", "Winter 25"]

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "COMPARISON OF SALES AND PURCHASES FOR THE YEAR 2025",
      },
    },
    scales: {
      y: {
        type: "linear",
        grid: {
          display: true, // Asegura que la cuadrícula se muestre
          drawOnChartArea: false, // Esto es válido en Chart.js v3+
          drawTicks: false,
        },
      },
      x: {
        type: "category",
      },
    },
  };  
  
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "PURCHASES",
        data: [30, 45, 28, 35, 42],
        borderColor: "#1e3c8b",
        backgroundColor: "#1e3c8b",
      },
      {
        label: "SALES",
        data: [25, 38, 32, 28, 38],
        borderColor: "#60a5fa",
        backgroundColor: "#60a5fa",
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const salesData = {
    labels: months,
    datasets: [
      {
        data: [300, 450, 500, 280, 350],
        backgroundColor: "#60a5fa",
      },
    ],
  }

  const purchasesData = {
    labels: months,
    datasets: [
      {
        data: [250, 380, 420, 300, 400],
        backgroundColor: "#1e3c8b",
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Line options={lineOptions} data={lineData} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-4 text-center">SALES FOR THE YEAR 2025</h3>
          <Bar options={barOptions} data={salesData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-4 text-center">PURCHASES FOR THE YEAR 2025</h3>
          <Bar options={barOptions} data={purchasesData} />
        </div>
      </div>
    </div>
  )
}

