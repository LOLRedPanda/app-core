import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Menu } from '@headlessui/react'

import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const[chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Tyriq', 'Tominatoo', 'Soxxy', 'RedPanda', 'JT'],
            datasets: [{
                label: '',
                data: [3.2, 4.9, 3.0, 4.7, 3.6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor:'rgb(53, 162, 235, 0.4',
            }
        ],

        })
        setChartOptions({
            plugins: {
                legend:{
                    display: false
                },
                title: {
                    display: true,
                    text: 'KDA'
                },
                maintainAspectRatio: false,
                responsive: true
            }
        })
    }, [])

  return (
    <>
    <div className='w-full md:col-span-2 reletive lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
    <Bar data={chartData} options={chartOptions} />
        
    </div>
    </>
  )
}

export default BarChart
