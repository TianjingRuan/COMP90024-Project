import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";

import suburbData from "../data/sampleData/sampleSuburb.json";
import KeplerGlSchema from "kepler.gl/schemas";
import languageData from "../data/sampleData/sampleLanguage.json";

const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: { readOnly: true }
    })
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function LanguageMap() {
    return (
        <Provider store={store}>
            <KeplerGlMap />
        </Provider>
    );
}

function KeplerGlMap() {
    const dispatch = useDispatch();
    suburbData["datasets"][0]["data"]["allData"].push([{
        "type":"Feature",
        "geometry":{"type": "Polygon", "coordinates": [[[144.958471, -37.801929], [144.96009, -37.805445], [144.959936, -37.806339], [144.970936, -37.807518], [144.971363, -37.807728], [144.973188, -37.807923], [144.975716, -37.793047], [144.96839, -37.79226], [144.968277, -37.792277], [144.968187, -37.792324], [144.968037, -37.792508], [144.967885, -37.79266], [144.967632, -37.79285], [144.967308, -37.793014], [144.966986, -37.79312], [144.966644, -37.79318], [144.966061, -37.793226], [144.96558, -37.793206], [144.965205, -37.793147], [144.964603, -37.796779], [144.964617, -37.79684], [144.963975, -37.800426], [144.95883, -37.799861], [144.958471, -37.801929]]]}},"Carlton", "Melb", 456])
    React.useEffect(() => {
        const map = KeplerGlSchema.load(suburbData);
        // add suburb info to the map
        dispatch(addDataToMap(map));
        // add points to the map
        dispatch(addDataToMap(languageData))
    });

    return (
        <div>
            <KeplerGl
                id="covid"
                mapboxApiAccessToken="pk.eyJ1Ijoib2xpdmlhMTMxNCIsImEiOiJjazljMnkweGYwMHN2M29vN2h5N3Y0Z2p3In0.ii0pWAJQE5VJWg_X-84MSw" //process.env.REACT_APP_MAPBOX_API}
                // adjust the map size
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    );
}