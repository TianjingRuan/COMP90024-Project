import React, {useState,useEffect} from 'react';
import WordCloudDiagram from "../components/wordCloudDiagram";
// Todo: retrieve from backend
import wordData from "../data/sampleData/wordcloud.json";
import "./diagram.css"
import TwitterBarChart from "../components/twitterBarChart";
import TwitterBarChartTime from "../components/TwitterBarChartTime";
import cityLanguageNew from "../data/sampleData/citydateLanguageNew.json";
import axios from 'axios';
export const BarChart = () => {
  //todo: connect with backend to fetch data
  const [result, setResult] = useState(cityLanguageNew);

  useEffect(() => {
      fetch("/scenario/city_date_language")
      .then(data => data.json(data))
      .then(data => setResult(data));
  }, []);

  console.log("The result gotten from bar chart");
  console.log(result);
  // console.log(result);
  var Ade=result.adelaide;
  var Syd=result.sydney;
  var Bri=result.brisbane;
  var Mel=result.melbourne;
  console.log("The data in Sydney");
  console.log(Syd);
  return (
    <div className="page">
      <h1>Bar chart</h1>
      <div className="diagram">
        <TwitterBarChartTime data={Ade} name="Adelaide"/>
        <TwitterBarChartTime data={Syd} name="Sydney"/>
        <TwitterBarChartTime data={Mel} name="Melbourne"/>
        <TwitterBarChartTime data={Bri} name="Brisbane"/>
      </div>
    </div>
  );
};

export const TagCloud = () => {
  const [worddata, setWorldCloud] = useState(wordData);
  console.log("initial result");
  console.log(worddata);
    useEffect(() => {
      fetch("/scenario/date_wordcloud")
      .then(data => data.json(data))
      .then(data => setWorldCloud(data));
  }, []);
    console.log("The result gotten from world cloud");
    console.log(worddata);
    // wordData = result;
    console.log(worddata);
    var wordCloudDiagrams = []
    Object.keys(worddata).forEach(function(time) {
        wordCloudDiagrams.push(
            <div className="diagram">
                <WordCloudDiagram wordData={worddata[time]} time={time}/>
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