import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import AppAPI from './services/app-api';

import reducers from './store/index';

import config from './config';
import './App.css';

const App = () => {
    const {
        apiUrl,
    } = config;

    const AppApi = new AppAPI(apiUrl);
    /* eslint-disable */
    // as per: https://github.com/zalmoxisus/redux-devtools-extension#usage
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(
                thunk.withExtraArgument({
                    AppApi,
                }),
            ),
        ),
    );

    /* eslint-enable */

    return (
        <Provider store={store}>
            <h1>hey</h1>
        </Provider>
    );
};

export default App;
