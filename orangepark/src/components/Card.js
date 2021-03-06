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
    background: 'transparent',
    textShadow: '2px 2px black',
    boxShadow: 'none',
    color: 'white'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '2.0rem',
    padding: '0.5rem 1.5rem',
    cursor: 'pointer',
    borderRadius: '3px',
    backgroundColor: '#ff6f00',
    background: 'linear-gradient(45deg, #ffa600 30%, #ff6a00 90%)',
    color: 'white',
    border: '3px solid #c9c9c9',
    width: '14rem',
    margin: 'auto',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#da5f00',
      border: '3px solid #c9c9c9',
    }
  },
  link: {
    textDecoration: 'none',
    display: 'flex'
  }
});

/**
 * Custom reusable Card which is shown on the landing page
 */
export default function CustomCard({ title, description, link }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" variant='h1' gutterBottom>
          {title}
        </Typography>
        <Link to={link} className={classes.link}>
          <Button fullWidth className={classes.btn} color="primary" size='large' variant='outlined'>{description}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
