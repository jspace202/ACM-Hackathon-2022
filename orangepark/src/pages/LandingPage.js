import React from "react";
import CustomCard from "../components/Card";
import { Grid } from "@material-ui/core";

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Grid container alignItems="stretch" direction="column" justifyContent="space-evenly">
          <Grid item xs={12}>
            <CustomCard title="Have a few extra parking spaces?" description="Rent" link="rent"/>
          </Grid>

          <Grid item xs={12}>
          <CustomCard title="Need a place to park?" description="Park" link="park" />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default LandingPage;
