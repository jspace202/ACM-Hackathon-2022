import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '2rem 1rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CustomCard({title, description, link}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} raised>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" variant='h1' gutterBottom>
          {title}
        </Typography>
        <Link to={link}>
        <Button fullWidth color="primary" size='large' variant='outlined'>{description}</Button>
        </Link>
      </CardContent>
      </Card>
  );
}
