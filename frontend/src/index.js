import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import {DigitProviders} from "@cthit/react-digit-components";
import {rootReducer} from "./app/App.reducer";
import {logger} from "redux-logger";


const theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: "#388e3c",
                dark: "#27632a",
                light: "#5fa463"
            },
            secondary: {
                main: "#ff9100",
                dark: "#b26500",
                light: "#ffa733"
            }
        }
    });

function getReducer(root) {
    return combineReducers(
        {
            root
        })
}

let middleware = [thunkMiddleware];
if (process.env.REACT_APP_MODE === "develop") {
    middleware = [...middleware, logger];
}

const store = createStore(getReducer(rootReducer), applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <DigitProviders theme={theme}>
            <App/>
        </DigitProviders>
    </Provider>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
