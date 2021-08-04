import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from './Home';
import Kinase from './Kinase';

// Set the CSS styles 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar
}));

function App() {

  // get the CSS classes
  const classes = useStyles();
  // Render the view: wrap it in a Router to enable switching between views
  return (<Router>
    <Container maxWidth="false" disableGutters="true">
      {/* Add a Bar that will be always visible in the app */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">ChemPhoPro</Link>
          </Typography>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/kinase">
          <Kinase />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  </Router>)
}

function About() {
  return <h2>About</h2>;
}

export default App;
