import './App.css';
import Container from './components/container/index';
import EditPage from './components/edit-page/index';
import FourOhFour from './components/404/index';
import Header from './components/header/index';
import Login from './components/loginsystem/login';
import Logout from './components/loginsystem/logout';
import Register from './components/loginsystem/register';
import Main from './components/main/main';
import Page from './components/page/index';
import React, { useEffect, useState } from 'react';
import UserPage from './components/user-page/index';

import withAuth from './components/withauth/withauthHOC';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = (props) => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch('/checkToken')
      .then(res => {
        if (res.status === 200) {
          res.json()
          .then(result => setCurrentUser(result.username));
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header user={currentUser}/>
      <Container>
      <Switch>
        <Route path="/users/:username/pages/:pageid" component={() => <Page user={currentUser}/>}/>
        <Route path="/users/:username/editpage/:pageid" component={withAuth(EditPage)}/>
        <Route path="/" exact component={withAuth(Main)} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={withAuth(Logout)} />
        <Route path="/register" component={Register} />
        <Route path="/users/:username" component={UserPage}/>
        <Route component={FourOhFour}/>
      </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
