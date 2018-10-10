import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Main from './components/Main.jsx';
import GameInstance from './components/GameInstance.jsx';


import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  }
});

const styles = theme => ({
  app: {
    boxSizing: 'border-box',
    margin: '0 auto',
    padding: '1px',
    width: '100%',
    minHeight:'100vh',
    maxWidth: '1200px',
    backgroundColor: '#c2caf5',
  },
  margin: {
    margin: '15px'
  },
  logo: {
    color: '#000',
    textDecoration: 'none'
  }
});

const App = ({classes}) => (
  <div className={classes.app}>
    <MuiThemeProvider theme={customTheme}>
    <Typography variant="h5" className={classes.margin}><Link to="/" className={classes.logo}>Tic tac toe game</Link></Typography>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/game/:id" component={GameInstance}/>
    </Switch>
    </MuiThemeProvider>
  </div>
);

export default withStyles(styles)(App);
