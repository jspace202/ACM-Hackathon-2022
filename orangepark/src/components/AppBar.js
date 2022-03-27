import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

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
  },
  toolbar:{
      backgroundColor: "#FE5C00",
  }
}));

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
          <Typography variant="h6" className={classes.title}>
            Orange Park
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
