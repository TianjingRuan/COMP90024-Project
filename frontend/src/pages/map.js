import React, {useState,useEffect} from 'react';
import LanguageMap from "../components/languageMap";
import TwitterCountMap from "../components/twitterCountMap";
// Todo: Retrieve from backend
import languageData from "../data/sampleData/sampleLanguage.json"
import twitterCountData from "../data/sampleData/sampleTwitterCount.json"
import axios from 'axios';
export const Language = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
      const data=response.data;
      console.log("The data is ");
      console.log(data);
      setResult(data[2].company.name);
      // axios returns API response body in .data
    })
  }, []);
  console.log("The result gotten from language data");
  console.log(result);
  return (
    <div className="page">
      <h1>Language Map</h1>
      <LanguageMap languageData={languageData}/>
    </div>
  );
};

export const TwitterCount = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
      const data=response.data;
      console.log("The data is ");
      console.log(data);
      setResult(data[2].company.name);
      // axios returns API response body in .data
    })
  }, []);
  console.log("The result gotten from Twitter count");
  console.log(result);
  return (
    <div className="page">
      <h1>Twitter Count</h1>
      <TwitterCountMap twitterCountData={twitterCountData} />
    </div>
  );
};