import React from "react";
import CustomCard from "../components/Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(https://raw.githubusercontent.com/jspace202/ACM-Hackathon-2022/main/images/Fans1609_OSUAthletics.jpg)`,
    height: 'calc(100vh - 64px)',
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    }
  }
}));


/**
 * Landing page which is shown by default on the default path
 */
const LandingPage = () => {
  const classes = useStyles();
  return (
    <Grid container alignItems="stretch" direction="column" justifyContent="space-evenly" className={classes.container}>
      <Grid item xs={12}>
        <CustomCard title="Have a few extra parking spaces?" description="Rent" link="rent" />
      </Grid>
      <Grid item xs={12}>
        <CustomCard title="Need a place to park?" description="Park" link="park" />
      </Grid>
    </Grid>
  );
}


export default LandingPage;
