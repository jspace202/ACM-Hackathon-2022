import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  toolbar: {
    backgroundColor: "#FE5C00",
  },
  link:{
    textDecoration: 'none',
    color: 'white'
  }
}));

/** 
 * Custom reusable app bar component for the whole app
 */
export default function CustomAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to='/' className={classes.link}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" className={classes.title}>
            OrangePark
          </Typography>
          <Link to='/about' className={classes.link}>
            <Button color="inherit">About us</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
