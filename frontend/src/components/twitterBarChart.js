import React, { useState,Component} from 'react';
import ReactECharts from "echarts-for-react";
export default function TwitterBarChart () {
    const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
          data: ['Chinese', 'Japanese', 'Korean', 'French'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934],
            type: 'line',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      };
      return <ReactECharts option={options} />;
}
//     return(
//         <ReactEcharts
//         option={{
//             xAxis: {
//                 type: "category",
//                 data: ["Chinese", "English", "Japanese", "Korean"]
//             },
//             yAxis: {
//                 type: "value"
//             },
//             series: [{ 
//                 data: [820, 932, 901, 934, 500],
//                 type: "line"
//             }]
//         }}
//     />
//  );
// }
// class TwitterBarChart extends Component {
//     render() {
//       return (
//         <ReactEcharts
//           option={{
//             xAxis: {
//               type: "category",
//               data: ["Chinese", "English", "Japanese", "Korean"]
//             },
//             yAxis: {
//               type: "value"
//             },
//             series: [{ 
//               data: [820, 932, 901, 934, 500],
//               type: "line"
//             }]
//           }}
//         />
//       );
//     }
//   }
//   export default TwitterBarChart;
