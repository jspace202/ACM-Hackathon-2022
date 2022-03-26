import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

export default function ParkingProvidingPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>
                Parking Provider Please fill the below details
            </h1>
            <div>
                <TextField
                    id="outlined-full-width"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Enter Your Name"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    id="outlined-margin-none"
                    defaultValue=""
                    className={classes.textField}
                    helperText="Enter your Email"
                    variant="outlined"
                />
                <TextField
                    label="Phone Number"
                    id="outlined-margin-none"
                    defaultValue=""
                    className={classes.textField}
                    helperText="Enter your Phone Number"
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Address"
                    style={{ margin: 8 }}
                    placeholder="Enter Your Address"
                    helperText=""
                    fullWidth
                    defaultValue=""
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </div>
        </div>
    );
}