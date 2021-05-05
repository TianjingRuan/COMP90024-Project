import React from "react";
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";

export const Language = () => {
  return (
    <div>
      <h1>Language Map</h1>
      <LanguageMap />
    </div>
  );
};

export const Sentiment = () => {
  return (
    <div>
      <h1>Sentiment analysis</h1>
      <TwitterCountMap />
    </div>
  );
};