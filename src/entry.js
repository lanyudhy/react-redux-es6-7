import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import createHistory from 'history/createBrowserHistory';
import rootReducer from './Redux/Reducer/index';
import App from './App.js';
import './Config/Config';

// let FastClick = require('fastclick');

//按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';

window.isEmpty = isEmpty;
window.isEqual = isEqual;
window.debounce = debounce;
window.isArray = isArray;

const history = createHistory();
const middleware = routerMiddleware(history);

//解决移动端300毫秒延迟
// FastClick.attach(document.body);
const middlewares = [thunk, middleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Component />
            </MuiThemeProvider>
        </Provider>,
        document.body.appendChild(document.createElement('div'))
    );

render(App);

if(module.hot) {
    module.hot.accept('./App', () => { render(App); });
}