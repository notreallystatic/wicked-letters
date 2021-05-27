import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '../Spinner';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Illustrations } from '../../utils';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

export const Dashboard = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get('/user/reviews')
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get('/user/get-info')
      .then((res) => {
        setUser(res.data.message);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='row m-0 p-0 deb'>
            <div className='col-xs-12 col-md-5 m-0 p-0 deb'>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      {user.name && user.name.substr(0, 1)}
                    </Avatar>
                  }
                  action={
                    <Tooltip
                      title={
                        user.isVerified
                          ? 'Account Verified'
                          : 'Account NOT Verified'
                      }
                    >
                      <Icon
                        fontSize='large'
                        color={user.isVerified ? 'success' : 'secondary'}
                        className={classes.fab}
                      >
                        {user.isVerified ? 'verified_user' : 'dangerous'}
                      </Icon>
                    </Tooltip>
                  }
                  title={user.name}
                  subheader={`${reviews.length} reviews posted`}
                />
                <CardMedia
                  className={classes.media}
                  image={Illustrations.ProfilePicture}
                  title={user.name}
                />
                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    <Icon>email</Icon>
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className='col-xs-12 col-md-7 m-0 p-0 deb'></div>
          </div>
        </>
      )}
    </div>
  );
};
