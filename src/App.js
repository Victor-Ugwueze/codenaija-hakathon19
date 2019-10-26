import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        {/* <Route path='/onboarding' exact component={Onboarding} /> */}
        {/* <Route path='/authenticate' exact component={Authenticate} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
