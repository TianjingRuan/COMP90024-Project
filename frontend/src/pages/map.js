import React from "react";
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";

export const Language = (props) => {
    const {foo} = props
    console.log(foo)
    console.log("hello")
  return (
    <div className="page">
      <h1>Language Map</h1>
      <LanguageMap />
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