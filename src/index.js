import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import decode from 'jwt-decode';

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools, } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import reducer from './reducers';

import setAuthorizationHeader from './components/utils/setAuthorizationHeader';
import { userFetched } from './actions/users';

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import pt from "react-intl/locale-data/pt";
import { localeSet } from './actions/locale';

addLocaleData(en);
addLocaleData(pt);



const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    console.log(payload);
    //const user = { token: localStorage.bookwormJWT, confirmed: payload.data.confirmed };
    const user = { token: localStorage.bookwormJWT, email: 'tjamancio@censanet.com.br', confirmed: true };
    setAuthorizationHeader(localStorage.bookwormJWT);
    store.dispatch(userFetched(user));
} else {
    store.dispatch(userFetched({}));
}

if (localStorage.alhubLang) {
    store.dispatch(localeSet(localStorage.alhubLang));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
