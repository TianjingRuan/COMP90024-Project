import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";

import twitterCountDataFrame from "../data/twitterCountDataFrame.json";
import suburbData from "../data/suburbData.json"
import KeplerGlSchema from "kepler.gl/schemas";
// Todo: change Aurin data
import populationData from "../data/sampleData/sampleAurinData.json";

const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: { readOnly: true }
    })
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function TwitterCountMap(props) {
    return (
        <Provider store={store}>
            <KeplerGlMap twitterCountData={props.twitterCountData}/>
        </Provider>
    );
}

function KeplerGlMap(props) {
    const dispatch = useDispatch();
    Object.keys(props.twitterCountData).forEach(function(city) {
        Object.keys(props.twitterCountData[city]).forEach(function(suburb) {
            const geoJson = suburbData[city][suburb];
            // Error Handling: skip suburb for geoJson not found
            if (geoJson == null) {
                console.log(suburb + " coordinates not found")
                return;
            }
            const twitterCount = props.twitterCountData[city][suburb];
            let femalePopulation;
            let malePopulation;
            // if aurin Data contains the population information of suburb
            if (populationData[city].hasOwnProperty(suburb)) {
                femalePopulation = populationData[city][suburb]['female'];
                malePopulation = populationData[city][suburb]['male'];
            }
            if (city === 'Sydney') {
                twitterCountDataFrame["datasets"][0]["data"]["allData"].push([geoJson, suburb, city, twitterCount, malePopulation, femalePopulation])
            }
            if (city === 'Melbourne') {
                twitterCountDataFrame["datasets"][1]["data"]["allData"].push([geoJson, suburb, city, twitterCount, malePopulation, femalePopulation])
            }
            if (city === 'Adelaide') {
                twitterCountDataFrame["datasets"][2]["data"]["allData"].push([geoJson, suburb, city, twitterCount, malePopulation, femalePopulation])
            }
            if (city === 'Brisbane') {
                twitterCountDataFrame["datasets"][3]["data"]["allData"].push([geoJson, suburb, city, twitterCount, malePopulation, femalePopulation])
            }
        })
    })

    React.useEffect(() => {
        const map = KeplerGlSchema.load(twitterCountDataFrame);
        // add suburb info to the map
        dispatch(addDataToMap(map));
    });

    return (
        <div>
            <KeplerGl
                // id="covid"
                mapboxApiAccessToken="pk.eyJ1Ijoib2xpdmlhMTMxNCIsImEiOiJjazljMnkweGYwMHN2M29vN2h5N3Y0Z2p3In0.ii0pWAJQE5VJWg_X-84MSw" //process.env.REACT_APP_MAPBOX_API}
                // adjust the map size
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    );
}