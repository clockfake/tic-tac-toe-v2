import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import GameList from './components/GameList.jsx';
import GameInstance from './components/GameInstance.jsx';

const App = () => (
  <Switch>
    <Route exact path="/" component={GameList}/>
    <Route path="/game/:id" component={GameInstance}/>
  </Switch>
);

export default App;
