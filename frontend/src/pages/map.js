import React, {useState,useEffect} from 'react';
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";
// Todo: Retrieve from backend
import languageData from "../data/sampleData/sampleLanguage.json"
import twitterCountData from "../data/sampleData/sampleTwitterCount.json"
export const Language = () => {
  const [result, setResult] = useState(languageData);
  useEffect(() => {
    fetch("/scenario/city_suburb_language") 
    .then(data => data.json(data))
    .then(data => setResult(data));
  }, []);
  console.log("The result gotten from language data");
  console.log(result);
  return (
    <div className="page">
      <h1>Language Map</h1>
      <LanguageMap languageData={result}/>
    </div>
  );
};

export const TwitterCount = () => {
  const [countresult, setCountResult] = useState(twitterCountData);
  useEffect(() => {
    fetch("/scenario/city_suburb") 
    .then(data => data.json(data))
    .then(data => setCountResult(data));
}, []);
  console.log("The result gotten from Twitter count");
  console.log(countresult);
  return (
    <div className="page">
      <h1>Twitter Count</h1>
      <TwitterCountMap twitterCountData={countresult} />
    </div>
  );
};