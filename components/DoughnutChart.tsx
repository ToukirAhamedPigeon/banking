'use client'
import React from 'react';
import {Chart as ChartJS , ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (
    // {accounts}:DoughnutChartProps
) => {
    const data={
        datasets: [
            {
                label: 'Banks',
                data:[1250, 2500, 3750],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                labels: ['Bank 1', 'Bank 2', 'Bank 3']
            }
        ]
    };
  return <Doughnut
   data={data}
   options={{
     cutout:"60%",
     plugins:{
        legend:{
            display:false
        }
     } 
    }}
    />
}

export default DoughnutChart
