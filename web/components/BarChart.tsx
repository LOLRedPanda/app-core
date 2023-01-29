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

function BarChart({ teamData }: InferProps<typeof BarChart.propTypes>) {
  const [chartData, setChartData] = useState<chartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: [
        teamData.members.top,
        teamData.members.jungle,
        teamData.members.mid,
        teamData.members.adc,
        teamData.members.support,
      ],
      datasets: [
        {
          label: "KDA",
          data: [
            teamData.stats.KDA.top,
            teamData.stats.KDA.jungle,
            teamData.stats.KDA.mid,
            teamData.stats.KDA.adc,
            teamData.stats.KDA.support,
          ],
          borderColor: "#7D98A1",
          backgroundColor: "#7D98A1",
        },
        {
          label: "CSMP",
          data: [
            teamData.stats.CSPM.top,
            teamData.stats.CSPM.jungle,
            teamData.stats.CSPM.mid,
            teamData.stats.CSPM.adc,
            teamData.stats.CSPM.support,
          ],
          borderColor: "#ff514d",
          backgroundColor: "#ff514d",
        },
        {
          label: "DMGPM(x100)",
          data: [
            teamData.stats.DMGPM.top,
            teamData.stats.DMGPM.jungle,
            teamData.stats.DMGPM.mid,
            teamData.stats.DMGPM.adc,
            teamData.stats.DMGPM.support,
          ],
          borderColor: "#ED009C",
          backgroundColor: "#ED009C",
        },
      ],
    });

    setChartOptions({
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
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 reletive lg:h-[70vh] h-[50vh] m-auto p-4 border border-[#FF514D] shadow-lg shadow-[#FF514D] rounded-lg bg-[#101021]">
        {" "}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
BarChart.propTypes = {
  teamData: PropTypes.any,
};
export default BarChart;
