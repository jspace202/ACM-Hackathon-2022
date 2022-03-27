import React from "react";
import { Card, Grid, Typography } from "@material-ui/core";

class ParkingAboutPage extends React.Component {
    render() {
        return (
        <div>
            <Grid container alignItems="stretch" direction="column" justifyContent="space-evenly">
            <Grid item xs={12}>
                <Card>
                    <Typography variant="h6" component="div">
                        What is OrangePark about?
                    </Typography>
                    <Typography variant="body2" component="p">
                        OrangePark is a service that allows you to rent and reserve parking spots for big events.
                    </Typography>
                    <Typography variant="body2" component="p">
                        If you live near a Stadium and have quite a bit of room in your driveway, why not rent that
                    </Typography>
                    <Typography variant="body2" component="p">
                        room away and make a little money while doing it. OrangePark allows parkers to see all 
                    </Typography>
                    <Typography variant="body2" component="p">
                        available spots around the event aswell as the renter's information, slots available, and
                    </Typography>
                    <Typography variant="body2" component="p">
                        on gameday.
                    </Typography>
                </Card>
            </Grid>
            </Grid>
        </div>
        );
    }
}

export default ParkingAboutPage;