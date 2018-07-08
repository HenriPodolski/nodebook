import * as React from 'react';
import { Switch, Route } from 'react-router';
import { AppComponent } from './components/app.component';
import { AppContainer } from './containers/app.container';

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/" component={AppComponent} />
    </Switch>
  </AppContainer>
);
