import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone } from '../utils';


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
    button: {
        margin: '0.5rem'
    }
}));

export default function ParkingProvidingPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        price: '',
        numberOfSpotsAvailable: '',
    })
    const [snackMessage, setSnackMessage] = React.useState({ type: '', value: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + details.address + ".json?limit=1&proximity=ip&types=place%2Cpostcode%2Caddress%2Cpoi%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood&access_token=pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA")
                .then(res => res.json())
                .then(async (result) => {
                    if (result && result.features && result.features.length) {
                        const [longitude, latitude] = result.features[0].center;
                        await addDoc(collection(db, 'spots'), {
                            name: details.name,
                            email: details.email,
                            phoneNumber: details.phoneNumber,
                            address: details.address,
                            latitude,
                            longitude,
                            createdAt: Timestamp.now(),
                            numberOfSpotsAvailable: details.numberOfSpotsAvailable,
                            price: details.price,
                            isValid: false
                        }).then(() => {
                            setSnackMessage({ type: '', value: 'Form Submitted successfully' });
                            setTimeout(() => { navigate('/'); }, 1000);
                        })
                    }
                    else {
                        setSnackMessage({ type: '', value: 'Failed to submit form, please try reloading and submitting again or try contact Administrator' })
                    }
                })

        } catch (err) {
            console.error(err);
            setSnackMessage({ type: '', value: 'Failed to submit form, please try reloading and submitting again or try contact Administrator' })
        }
    }

    const handleSnackClose = () => {
        setSnackMessage({ type: '', value: '' })
    }

    const isFormValid = useMemo(() => {
        if (details.name && details.email && isValidEmail(details.email) &&
            details.phoneNumber && isValidPhone(details.phoneNumber) && details.address && details.address.length > 3 && details.numberOfSpotsAvailable && details.price) {
            return true;
        }
        return false;
    }, [details]);

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'middle',
                }}
                open={Boolean(snackMessage.value)}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message={snackMessage.value}
            />
            <div className={classes.root}>
                <h1>
                    Parking Provider Please fill the below details
                </h1>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Name"
                        onChange={handleChange}
                        name="name"
                        value={details.name}
                        style={{ margin: 8 }}
                        placeholder="Enter Your Name"
                        helperText="Please enter your full name!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required="true"
                    />
                    <TextField
                        label="Email"
                        value={details.email}
                        name="email"
                        type="email"
                        onChange={handleChange}
                        id="outlined-margin-none"
                        defaultValue=""
                        className={classes.textField}
                        helperText="Please enter a valid email"
                        variant="outlined"
                        required="true"
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        type="number"
                        value={details.phoneNumber}
                        onChange={handleChange}
                        id="outlined-margin-none"
                        defaultValue=""
                        className={classes.textField}
                        helperText="Please enter valid Phone number"
                        variant="outlined"
                        required="true"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Address"
                        name="address"
                        value={details.address}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Please enter a valid address"
                        helperText=""
                        fullWidth
                        defaultValue=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required="true"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Number of Slots Available"
                        onChange={handleChange}
                        name="numberOfSpotsAvailable"
                        type="number"
                        value={details.numberOfSpotsAvailable}
                        style={{ margin: 8 }}
                        placeholder="Enter Number"
                        helperText="Please enter max number of cars that can fit"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required="true"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Price"
                        onChange={handleChange}
                        name="price"
                        type="number"
                        value={details.price}
                        style={{ margin: 8 }}
                        placeholder="Enter Price $"
                        helperText="Please the Price you are expecting in Dollars"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required="true"
                    />
                </div>
            </div>
            <Button className={classes.button} disabled={!isFormValid} color="secondary" size='large' variant='outlined' onClick={handleSubmit}>Submit</Button>
        </>

    );
}