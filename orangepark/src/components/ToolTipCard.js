import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { Grid, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        boxShadow: 'none'
    },
    iconButton: {
        verticalAlign: 'bottom',
        marginRight: '1rem'
    },
    closeContainer:{
        display: 'flex',
        justifyContent: 'space-between',
    }
});

export default function ToolTipCard({ data, handleClose }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid className={classes.closeContainer}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <IconButton size="small" onClick={handleClose}><CloseIcon /></IconButton>
                </Grid>
                <Typography variant="body2" color="textSecondary" component="p">
                    <HomeIcon className={classes.iconButton} />{data.address}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    <MailOutlineIcon className={classes.iconButton} />{data.email}
                    <br />
                    <AttachMoneyIcon className={classes.iconButton} /> {data.price}
                    <br />
                    <HourglassEmptyIcon className={classes.iconButton} /><span> Spots Availabe :</span> {data.numberOfSpotsAvailable}

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <a href={`https://www.google.com/maps/dir//${data.latitude},${data.longitude}`}>
                        Get Directions
                    </a>
                </Button>
            </CardActions>
        </Card>
    );
}
