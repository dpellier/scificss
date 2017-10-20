
import 'normalize.css';
import './index.scss';
import './styles/font.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import App from './views/App.jsx';
import Home from './views/home/Home.jsx';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/home" />
            <Route path="/home" component={Home} />
        </Route>
    </Router>
), document.getElementById('app'));
