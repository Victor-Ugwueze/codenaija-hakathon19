import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CheckPage from './components/CheckPage';
import './App.css'

function App() {
  return (
    <div className="App">

    <BrowserRouter>
       <NavBar/>
      <Switch>
        <Route path='/home-page' exact component={HomePage} />
        <Route path='/check-page' exact component={CheckPage} />
        { /* <Route path='/authenticate' exact component={Authenticate} /> */ }
      </Switch>
    </BrowserRouter>
    </div>
    );
}

export default App;
