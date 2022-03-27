import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: '5%'
    },
    head: {
        fontSize: '3rem',
        textAlign: 'center'
    },
    body: {
        fontSize: '30px',
        textAlign: 'left',
        color: 'grey',
        marginLeft: '2%',
        marginRight: '2%'
    },
    footer: {
        fontSize: '20px',
        textAlign: 'left',
        color: '#c4c4c4',
        margin: '2%'
    }
});
  
const ParkingAboutPage = () => {
    const classes = useStyles();
        return (
        <div>
            <Grid container alignItems="stretch" direction="column" justifyContent="space-evenly">
            <Grid item xs={12}>
                <Card className={classes.root}>
                    <Typography className={classes.head} variant="h6" component="div">
                        What is OrangePark about?
                    </Typography>
                    <Typography className={classes.body} variant="body2" component="p">
                        OrangePark is a service that allows you to rent and reserve parking spots for big events.
                        If you live near a Stadium and have quite a bit of room in your driveway, why not rent that
                        room away and make a little money while doing it. OrangePark allows parkers to see all
                        available spots around the event aswell as the renter's information, slots available, and
                        asking price. OrangePark is a streamlined way to save time and money on gameday.
                    </Typography>
                    <Typography className={classes.footer} variant="body2" component="p">
                        Our e-mail: NotAFakeEmail@gmail.com<br/>
                        If you have filled out the renter's forum, please e-mail us to be validated.
                        If you need us to remove/update information please e-mail us aswell.
                    </Typography>
                </Card>
            </Grid>
            </Grid>
        </div>
        );
}

export default ParkingAboutPage;