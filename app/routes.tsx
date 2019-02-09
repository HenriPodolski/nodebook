import * as React from 'react';
import { Switch, Route } from 'react-router';
import { AppContainer } from './containers/app.container';
import { HtmlMapContainer } from './containers/html-map.container';
import { HashRouter } from 'react-router-dom';

export default () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={AppContainer} />
            <Route path="/html" component={HtmlMapContainer} />
        </Switch>
    </HashRouter>
);
