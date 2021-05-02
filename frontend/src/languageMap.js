import React from 'react';
import { addDataToMap } from "kepler.gl/actions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import keplerGlReducer from "kepler.gl/reducers";
import { taskMiddleware } from "react-palm/tasks";
import englishData from "./data/language/english.json"
import chineseData from "./data/language/chinese.json"


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

    React.useEffect(() => {
        dispatch(  addDataToMap({
            datasets: [{
                info: {
                    label: 'English Sample points',
                    id: 'english_data'
                },
                data: englishData
            },
                {info: {
                    label: 'Chinese Sample points',
                    id: 'chinese_data'
                },
                data: chineseData
            }
            ],
            option: {
                centerMap: true,
                keepExistingConfig: false
            },
            config: {},
        }))
    });

    return (
        <KeplerGl
            id="test"
            mapboxApiAccessToken={'pk.eyJ1IjoiYWltZWVydWFuIiwiYSI6ImNrbzNwYmVvazAwaXkycHM2ZmM0NWNsdnoifQ.G-LRGMdLQJcEcxwh1eNdHw'}
            width={1000}
            height={600}
        />
    );
}