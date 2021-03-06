import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";

import languageDataFrame from "../data/languageDataFrame.json";
import suburbData from "../data/suburbData.json"
import KeplerGlSchema from "kepler.gl/schemas";

const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: { readOnly: true }
    })
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function LanguageMap(props) {
    return (
        <Provider store={store}>
            <KeplerGlMap languageData={props.languageData}/>
        </Provider>
    );
}

function KeplerGlMap(props) {
    const dispatch = useDispatch();
    Object.keys(props.languageData).forEach(function(city) {
        Object.keys(props.languageData[city]).forEach(function(suburb) {
            let geoJson;
            if (suburbData[city].hasOwnProperty(suburb)) {
                geoJson = suburbData[city][suburb];
            }
            const spanish = props.languageData[city][suburb]["Spanish"];
            const indonesian = props.languageData[city][suburb]["Indonesian"];
            const japanese = props.languageData[city][suburb]["Japanese"];
            const portuguese = props.languageData[city][suburb]["Portuguese"];
            if (city === 'Sydney') {
                languageDataFrame["datasets"][0]["data"]["allData"].push([geoJson, suburb, spanish, indonesian, japanese, portuguese])
            }
            if (city === 'Melbourne') {
                languageDataFrame["datasets"][1]["data"]["allData"].push([geoJson, suburb, spanish, indonesian, japanese, portuguese])
                }
            if (city === 'Adelaide') {
                languageDataFrame["datasets"][2]["data"]["allData"].push([geoJson, suburb, spanish, indonesian, japanese, portuguese])
            }
            if (city === 'Brisbane') {
                languageDataFrame["datasets"][3]["data"]["allData"].push([geoJson, suburb, spanish, indonesian, japanese, portuguese])
            }
        })
    })

    React.useEffect(() => {
        const map = KeplerGlSchema.load(languageDataFrame);
        // add suburb info to the map
        dispatch(addDataToMap(map));
    });

    return (
        <div>
            <KeplerGl
                mapboxApiAccessToken="pk.eyJ1Ijoib2xpdmlhMTMxNCIsImEiOiJjazljMnkweGYwMHN2M29vN2h5N3Y0Z2p3In0.ii0pWAJQE5VJWg_X-84MSw" //process.env.REACT_APP_MAPBOX_API}
                // adjust the map size
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    );
}