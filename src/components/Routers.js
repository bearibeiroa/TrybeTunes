import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {
  Login,
  Search,
  Album,
  Favorites,
  Profile,
  ProfileEdit,
  NotFound,
} from '../pages';

class Routers extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routers;
