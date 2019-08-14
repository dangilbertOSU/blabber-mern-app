import './App.css';
import Container from './components/container/index';
import EditPage from './components/edit-page/index';
import Header from './components/header/index';
import Login from './components/loginsystem/login';
import Register from './components/loginsystem/register';
import Main from './components/main/main';
import Page from './components/page/index';
import React from 'react';
import UserPage from './components/user-page/index';

import withAuth from './components/withauth/withauthHOC';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = (props) => {

  return (
    <BrowserRouter>
      <Header/>
      <Container>
      <Switch>
        <Route path="/users/:username/pages/:pageid" component={Page}/>
        <Route path="/users/:username/editpage/:pageid" component={withAuth(EditPage)}/>
        <Route path="/" exact component={withAuth(Main)} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users/:username" component={UserPage}/>
      </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
