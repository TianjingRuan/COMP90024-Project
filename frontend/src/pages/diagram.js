import React from "react";
import WordCloudDiagram from "../components/wordCloudDiagram";
import "./diagram.css"
import TwitterBarChart from "../components/twitterBarChart";
import TwitterBarChartTime from "../components/TwitterBarChartTime";
export const BarChart = () => {
  
  return (
    <div className="page">
      <h1>Bar chart</h1>
      <div>
        <TwitterBarChart/>
        <TwitterBarChartTime/>
      </div>
    </div>
  );
};

export const WordCloud = () => {
  return (
    <div className="page">
        <h1>Word cloud</h1>
        <div className="diagram">
            <WordCloudDiagram/>
        </div>
    </div>
  );
};