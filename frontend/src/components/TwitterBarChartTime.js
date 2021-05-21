import React, { useState,Component} from 'react';
import ReactECharts from "echarts-for-react";
class TwitterBarChartTime extends Component{
    constructor(props){
      super(props);
      console.log("The props is");
      console.log(props);
    }
    getOption = () => {
        let districts = [];
        let dates = [];
        Object.entries(this.props.data).forEach(entry => {
          dates = [...dates, entry[0]];
          entry[1].forEach(e => {
            districts = [...new Set([...districts, e.name])];
          });
        });
        let options = dates.map(date => {
          let obj = {};
          obj["series"] = [
            {
              stack: "group",
              data: this.props.data[date]
            },
          ];
          obj["title"] = {
            text: `Count of language usage across ${this.props.name}, ${date}`
          };
          return obj;
        });
        return {
          baseOption: {
            timeline: {
              autoPlay: true,
              axisType: "category",
              bottom: 20,
              data: dates,
              height: null,
              inverse: true,
              left: null,
              orient: "vertical",
              playInterval: 1000,
              right: 0,
              top: 20,
              width: 55,
              label: {
                normal: {
                  textStyle: {
                    color: "#aaa"
                  }
                },
                emphasis: {
                  textStyle: {
                    color: "#333"
                  }
                }
              },
              symbol: "none",
              lineStyle: {
                color: "#aaa"
              },
              checkpointStyle: {
                color: "#354EF6",
                borderColor: "transparent",
                borderWidth: 2
              },
              controlStyle: {
                showNextBtn: false,
                showPrevBtn: false,
                normal: {
                  color: "#354EF6",
                  borderColor: "#354EF6"
                },
                emphasis: {
                  color: "#5d71f7",
                  borderColor: "#5d71f7"
                }
              }
            },
            color: ["#e91e63", "#354EF6"],
            title: {
              subtext: "Language",
              textAlign: "left",
              left: "5%"
            },
            tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10 },
            legend: {
              data: ["Language"],
              itemGap: 35,
              itemHeight: 18,
              right: "11%",
              top: 20
            },
            calculable: true,
            grid: {
              top: 100,
              bottom: 150,
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                  label: {
                    show: true,
                    formatter: function(params) {
                      return params.value.replace("\n", "");
                    }
                  }
                }
              }
            },
            xAxis: [
              {
                axisLabel: {
                  interval: 0,
                  rotate: 55,
                  textStyle: {
                    baseline: "top",
                    color: "#333",
                    fontSize: 10,
                    fontWeight: "bold"
                  }
                },
                axisLine: { lineStyle: { color: "#aaa" }, show: true },
                axisTick: { show: false },
                data: districts,
                splitLine: { show: false },
                type: "category"
              }
            ],
            yAxis: [
              {
                axisLabel: {
                  textStyle: { fontSize: 10 }
                },
                axisLine: { show: false },
                axisTick: { show: false },
                name: "Language",
                splitLine: {
                  lineStyle: {
                    type: "dotted"
                  }
                },
                type: "value"
              }
            ],
            series: [{ name: "Female", type: "bar" }]
          },
          options: options
        };
      };
    render(){
        return (
            <ReactECharts
              option={this.getOption()}
              style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
              opts={{ renderer: "svg" }}
            />
        );
    }
}
export default TwitterBarChartTime;