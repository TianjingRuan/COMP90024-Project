import React from "react";
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";
// Todo: Retrieve from backend
import languageData from "../data/sampleData/sampleLanguage.json"
import twitterCountData from "../data/sampleData/sampleTwitterCount.json"

export const Language = () => {
  return (
    <div className="page">
      <h1>Language Map</h1>
      <LanguageMap languageData={languageData}/>
    </div>
  );
};

export const TwitterCount = () => {
  return (
    <div className="page">
      <h1>Twitter Count</h1>
      <TwitterCountMap twitterCountData={twitterCountData} />
    </div>
  );
};