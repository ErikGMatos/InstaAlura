import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Logout from './componentes/Logaut';
import Login from './componentes/Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';


import { Provider } from 'react-redux';


function verificaAutenticacao(nextState, replace) {

    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    });

    let valida = false;
    if (match !== null) {
        valida = match.isExact;
    }
    
    if (valida && localStorage.getItem('auth-token') === null) {

        return <Redirect to={{
            pathname: '/',
            state: { msg: 'Faça login para acessar esta página' }
        }} />
    }

    else if (!valida && localStorage.getItem('auth-token') !== null) {

        const matchEsp = matchPath(nextState.location.pathname, {
            path: '/timeline/:login',
            exact: true,
            strict: false
        })

        if (matchEsp !== null && matchEsp.isExact) {

            return <App login={matchEsp.params.login} />
        }

    }
    return <App />
}


const reducers = combineReducers({ timeline: timeline, notificacao: notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}> 
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
            <Route path='/timeline/:login?' render={verificaAutenticacao} />
                <Route path="/logout" component={Logout} />
            </Switch>
        </Router>
    </Provider>
    ,document.getElementById('root')
);


serviceWorker.unregister();
