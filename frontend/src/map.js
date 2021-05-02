import React from 'react';
import { addDataToMap } from "kepler.gl/actions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import keplerGlReducer from "kepler.gl/reducers";
import { taskMiddleware } from "react-palm/tasks";
import KeplerGlSchema from "kepler.gl/schemas";
import useSwr from "swr";


const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: { readOnly: true }
    })
});

const sampleTripData = {
    fields: [
        {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
        {name: 'pickup_longitude', format: '', type: 'real'},
        {name: 'pickup_latitude', format: '', type: 'real'}
    ],
    rows: [
        ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
        ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
        ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
    ]
};

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function Map() {
    return (
        <Provider store={store}>
            <KeplerGlMap />
        </Provider>
    );
}

function KeplerGlMap() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(  addDataToMap({
            datasets: {
                info: {
                    label: 'Sample Taxi Trips in New York City',
                    id: 'test_trip_data'
                },
                data: sampleTripData
            },
            option: {
                centerMap: true,
                keepExistingConfig: false
            },
            config: {}
        }))
    });

    return (
        <KeplerGl
            id="test"
            mapboxApiAccessToken={'pk.eyJ1IjoiYWltZWVydWFuIiwiYSI6ImNrbzNwYmVvazAwaXkycHM2ZmM0NWNsdnoifQ.G-LRGMdLQJcEcxwh1eNdHw'}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}