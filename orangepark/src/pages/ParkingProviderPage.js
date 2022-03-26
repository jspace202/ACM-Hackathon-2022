import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import { useNavigate } from "react-router-dom";


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
            await addDoc(collection(db, 'spots'), {
                name: details.name,
                email: details.email,
                phoneNumber: details.phoneNumber,
                address: details.address,
                createdAt: Timestamp.now()
            }).then(()=>{
                setSnackMessage({type: '', value: 'Form Submitted successfully'});
                setTimeout(() => {  navigate('/'); }, 1000);
            })
        } catch (err) {
            console.error(err);
            setSnackMessage({type:'', value: 'Failed to submit form, please try reloading and submitting again or try contact Administrator'})
        }
    }

    const handleSnackClose = () =>{
        setSnackMessage({type: '', value:''})
    }

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
                        value={details.email}
                        name="email"
                        onChange={handleChange}
                        id="outlined-margin-none"
                        defaultValue=""
                        className={classes.textField}
                        helperText="Enter your Email"
                        variant="outlined"
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={details.phoneNumber}
                        onChange={handleChange}
                        id="outlined-margin-none"
                        defaultValue=""
                        className={classes.textField}
                        helperText="Enter your Phone Number"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Address"
                        name="address"
                        value={details.address}
                        onChange={handleChange}
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
            <Button className={classes.button} color="secondary" size='large' variant='outlined' onClick={handleSubmit}>Submit</Button>
        </>

    );
}