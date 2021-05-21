import React, { useState,Component,useEffect} from 'react';
import ReactECharts from "echarts-for-react";
import axios from 'axios';
export default function TwitterBarChart () {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
      const data=response.data;
      setResult(data[0].company.name);
      // axios returns API response body in .data
    })
  }, [])
  // var title="";
  // axios.get(`https://jsonplaceholder.typicode.com/users`)
  // .then(res => {
  //   const persons = res.data;
  //   title=persons[0];
  //   console.log("The data has been gotten");
  //   console.log(persons);
  //   console.log(persons[0].company.name);
  //   console.log(title);
  // });
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
      console.log("The result is");
      console.log(result);
      return (
      <div>
      <h2 style={{ color: 'red' }}>{result}</h2>
      <ReactECharts option={options} />
      </div>);
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
