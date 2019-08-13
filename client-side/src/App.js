import './App.css';
import Login from './components/loginsystem/login';
import Register from './components/loginsystem/register';
import Main from './components/main/main';
import React from 'react';
import withAuth from './components/withauth/withauthHOC';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={withAuth(Main)} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
