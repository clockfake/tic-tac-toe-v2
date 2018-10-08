import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import { apiLink } from './constants';
import GameList from './components/GameList.jsx';
import GameInstance from './components/GameInstance.jsx';

const App = () => (
  <Switch>
    <Route exact path="/" component={GameList}/>
    <Route path="/game/:id" component={GameInstance}/>
  </Switch>
);

export default App;
