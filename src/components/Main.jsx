import React, { Component } from 'react';
import { apiLink } from '../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


export default class GameList extends Component {
  state = {
    fetchedData: null,
    selectedTab: 0
  }

  tabs = [
    { content: 'Hosted games:', type:'hosted' },
    { content: 'Playing games:', type:'playing' },
    { content: 'Recently finished games:', type:'finished' }
  ];

  componentDidMount = () => {
    this.getGamesList();
  }

  createGame = async () => {
    const resp = await axios.post(`${apiLink}api/creategame`);
    this.props.history.push(`/game/${resp.data.game._id}`);
  }

  getGamesList = async (e, selectedTab = 0) => {
    const resp = await axios.get(`${apiLink}api/view`, {
      params: {
        type: this.tabs[selectedTab].type
      }
    });
    this.setState({fetchedData: resp.data.games, selectedTab});
  }

  render() {
    return (
      <React.Fragment>
      <AppBar position="static">
        <Tabs value={this.state.selectedTab} onChange={this.getGamesList}>
        {this.tabs.map((tab,index) => (
          <Tab
            key={index}
            label={tab.content}
            className={`game-types__tab ${this.state.selectedTab === index ? 'game-types__tab--active' : ''}`}
          />
        ))}
        </Tabs>
      </AppBar>
      {
        !this.state.fetchedData ? <CircularProgress/> :
        <div>
          {
            this.state.fetchedData.length === 0 ? <p>List is currently empty...</p>
            : this.state.fetchedData.map(i => {
               return (
                 <div key={i._id}>
                   <p>{i.createdAt}</p>
                   <p> Existing players:
                   {i.playerX && 'X'}
                   {i.playerO && 'O'}
                   </p>
                   <Button variant="outlined" component={Link} to={`/game/${i._id}`}>Join game</Button>
                 </div>
               )
             })
          }
          <Button variant="contained" color="primary" onClick={this.createGame}>Create new game</Button>
        </div>
      }

      </React.Fragment>
    )
  }
}
