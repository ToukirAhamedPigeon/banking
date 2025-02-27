'use client'
import React from 'react';
import {Chart as ChartJS , ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (
     {accounts}:DoughnutChartProps
) => {
    const accountNames = accounts.map(account => account.name);
    const balances = accounts.map(account => account.currentBalance);
    console.log({accountNames, balances});
    const data={
        datasets: [
            {
                label:'Banks',
                data:balances,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
            }
        ],
        labels: accountNames
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
