import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const AuthCharts = ({ labels, values, title }) => {

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        backgroundColor: "#235789",
        borderColor: "#235789",
        data: values,
        fill: true,
        pointHoverBorderColor: "#23578947",
      },
    ],

  };

  const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart',
    //   },
    // },
  };

  // const options = {
  //   scales: {
  //     y: {
  //       scaleLabel: {
  //         display: true,
  //         labelString: "Hello"
  //       }
  //     },
  //     yAxes: [{
  //       scaleLabel: {
  //         display: true,
  //         labelString: 'probability'
  //       },

  //     }],
  //   },

  //}


  return (
    <div className="w-full">
      <Line data={data} options={options} />
      {/* <Line data={data} /> */}
    </div>
  );
};

export default AuthCharts;