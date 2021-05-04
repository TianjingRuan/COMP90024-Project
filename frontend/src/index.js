import React from 'react';
import ReactDOM from 'react-dom';
import LanguageMap from "./components/languageMap";
import TwitterCountMap from "./components/twitterCountMap";

function Container(){
    return[
        <LanguageMap />,
        <TwitterCountMap />
    ]
}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
);
