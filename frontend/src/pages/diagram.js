import React from "react";
import WordCloudDiagram from "../components/wordCloudDiagram";
// Todo: retrieve from backend
import wordData from "../data/sampleData/wordcloud.json";
import "./diagram.css"
import TwitterBarChart from "../components/twitterBarChart";
import TwitterBarChartTime from "../components/TwitterBarChartTime";
export const BarChart = () => {
  
  return (
    <div className="page">
      <h1>Bar chart</h1>
      <div className="diagram">
        <TwitterBarChart/>
        <TwitterBarChartTime/>
      </div>
    </div>
  );
};

export const TagCloud = () => {
    var wordCloudDiagrams = []
    Object.keys(wordData).forEach(function(time) {
        wordCloudDiagrams.push(
            <div className="diagram">
                <WordCloudDiagram wordData={wordData[time]} time={time}/>
            </div>
        )
    })
    return (
        <div className="page">
            <h1>Tag cloud</h1>
            <div>{wordCloudDiagrams}</div>
        </div>
  );
};