import React from 'react';
import ReactDOM from 'react-dom';
import LanguageMap from "./components/languageMap";

function Container(){
    return[
        <LanguageMap />
    ]
}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
);
