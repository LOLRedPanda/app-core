import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Menu } from '@headlessui/react'
import type { ChartData, ChartOptions } from 'chart.js';

import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { data } from '../data/data';
import ListBox from './ListBox';

interface chartData{
    labels: string[] ,
    datasets: dataset[]
}

interface dataset{
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {
    const [chartData, setChartData] = useState<chartData>({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            borderColor: '',
            backgroundColor:'',
        }]
    })

    const[chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Tyriq', 'Tominatoo', 'Soxxy', 'RedPanda', 'JT'],
            datasets: [{
                label: 'KDA',
                data: [3.2, 4.9, 3.0, 4.7, 3.6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor:'rgb(53, 162, 235, 0.4)',
            },
            {
                label: 'CSMP',
                data: [3.2, 4.9, 3.0, 4.7, 3.6],
                borderColor: 'rgb(255, 50, 50)',
                backgroundColor:'rgb(255, 50, 50, 0.4)',
            }
        ],

        })
        setChartOptions({
            plugins: {
                legend:{
                    display: true
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
    <div className='w-full md:col-span-2 reletive lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>    <Bar data={chartData} options={chartOptions} />
        
    </div>
    </>
  )
}

export default BarChart
