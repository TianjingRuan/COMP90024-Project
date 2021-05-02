import React from 'react';
import { addDataToMap } from "kepler.gl/actions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import keplerGlReducer from "kepler.gl/reducers";
import { taskMiddleware } from "react-palm/tasks";
import useSwr from "swr";


const reducers = combineReducers({
    keplerGl: keplerGlReducer
});

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
    const { data } = useSwr("covid", async () => {
        const response = await fetch(
            "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
        );
        const data = await response.json();
        return data;
    });

    React.useEffect(() => {
        if (data) {
            dispatch(
                addDataToMap({
                    datasets: {
                        info: {
                            label: "COVID-19",
                            id: "covid19"
                        },
                        data
                    },
                    option: {
                        centerMap: true,
                        readOnly: false
                    },
                    config: {}
                })
            );
        }
    }, [dispatch, data]);

    return (
        <KeplerGl
            id="test"
            mapboxApiAccessToken={'pk.eyJ1IjoiYWltZWVydWFuIiwiYSI6ImNrbzNwYmVvazAwaXkycHM2ZmM0NWNsdnoifQ.G-LRGMdLQJcEcxwh1eNdHw'}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}