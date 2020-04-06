import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './rootReducer'
import { createEpicMiddleware } from "redux-observable";

import rootEpic from './rootEpic'

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export const configureStore = (preloadedState: any) => {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history))),
    );
    epicMiddleware.run(rootEpic);
    return store
};


