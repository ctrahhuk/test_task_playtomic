import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from './rootStore';
import { Firebase } from "./common/database/Firebase";
import { FirebaseContext } from "./common/database/FirebaseContext";

const store = configureStore({});


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
