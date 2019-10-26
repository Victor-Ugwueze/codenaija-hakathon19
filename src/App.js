import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CheckPage from './components/CheckPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path='/home-page' exact component={HomePage} />
        <Route path='/check-page' exact component={CheckPage} />
        {/* <Route path='/authenticate' exact component={Authenticate} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
