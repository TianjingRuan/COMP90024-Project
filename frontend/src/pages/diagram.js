import React from "react";
import WordCloudDiagram from "../components/wordCloudDiagram";
import "./diagram.css"

export const BarChart = () => {
  return (
    <div >
      <h1>Bar chart</h1>
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