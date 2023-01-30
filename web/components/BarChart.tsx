import React, { useEffect, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { Bar } from "react-chartjs-2";
// import teamData from "../data/teams"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface chartData {
  labels: string[];
  datasets: dataset[];
}

interface dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chartData }: InferProps<typeof BarChart.propTypes>) {

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Team Stats",
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  }


  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border border-[#ED009C] shadow-lg shadow-[#ED009C] rounded-lg bg-[#101021] text-[#7D98A1]">
        {" "}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}

BarChart.propTypes = {
  chartData: PropTypes.any,
};

export default BarChart;
