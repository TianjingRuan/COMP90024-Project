import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";

import data from "./data/suburb.json";
import KeplerGlSchema from "kepler.gl/schemas";

const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: { readOnly: true }
    })
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function SuburbMap() {
    return (
        <Provider store={store}>
            <KeplerGlMap />
        </Provider>
    );
}

function KeplerGlMap() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const map = KeplerGlSchema.load(data);
        dispatch(addDataToMap(map));
    });

    return (
        <div>
            <KeplerGl
                id="covid"
                mapboxApiAccessToken="pk.eyJ1Ijoib2xpdmlhMTMxNCIsImEiOiJjazljMnkweGYwMHN2M29vN2h5N3Y0Z2p3In0.ii0pWAJQE5VJWg_X-84MSw" //process.env.REACT_APP_MAPBOX_API}
                width={1000}
                height={600}
            />
        </div>
    );
}