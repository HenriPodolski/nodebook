import * as React from 'react';
import { Switch, Route } from 'react-router';
import { AppContainer } from './containers/app.container';
import { HashRouter } from 'react-router-dom';
import { HtmlMapContainer } from './modules/html-map/containers/html-map.container';

export default () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={AppContainer} />
            <Route path="/html" component={HtmlMapContainer} />
        </Switch>
    </HashRouter>
);
