import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GameList from './components/GameList.jsx';
import GameInstance from './components/GameInstance.jsx';
import './css/App.css';

const App = () => (
  <div className="app">
  <h2>Tic tac toe game</h2>
  <Switch>
    <Route exact path="/" component={GameList}/>
    <Route path="/game/:id" component={GameInstance}/>
  </Switch>
  </div>
);

export default App;
