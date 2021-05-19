import React from "react";
import WordCloudDiagram from "../components/wordCloudDiagram";
// Todo: retrieve from backend
import wordData from "../data/sampleData/sampleWordCloud.json";
import "./diagram.css"

export const BarChart = () => {
  return (
    <div >
      <h1>Bar chart</h1>
    </div>
  );
};

export const TagCloud = () => {
    var timeArray = [];
    var dataArray = [];
    Object.keys(wordData).forEach(function(time) {
        timeArray.push(time)
        dataArray.push(wordData[time])
    })
    return (
        <div className="page">
            <h1>Tag cloud</h1>
            <div className="diagram">
                <WordCloudDiagram wordData={dataArray[0]} time={timeArray[0]}/>
            </div>
            <div className="diagram">
                <WordCloudDiagram wordData={dataArray[1]} time={timeArray[1]}/>
            </div>
            <div className="diagram">
                <WordCloudDiagram wordData={dataArray[1]} time={timeArray[1]}/>
            </div>
            <div className="diagram">
                <WordCloudDiagram wordData={dataArray[1]} time={timeArray[1]}/>
            </div>
        </div>
  );
};