import React from "react";
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";
import {useLocation} from 'react-router-dom';
import TwitterBarChartTime from "../components/TwitterBarChartTime";
export const Language = (props) => {
  const loc = useLocation();
  console.log('ProductList -> loc', loc);
  return (
    <div className="page">
      <h1>Language Map</h1>
      <LanguageMap/>
      <TwitterBarChartTime/>
    </div>
  );
};

export const Sentiment = () => {
  return (
    <div className="page">
      <h1>Sentiment analysis</h1>
      <TwitterCountMap />
    </div>
  );
};