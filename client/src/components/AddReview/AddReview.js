import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PrimaryButton, Label, TextArea } from '../styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    maxWidth: '100%',
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
}));

export const AddReview = ({ onClose, newsletterId, title, imageUrl }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(2.5);
  const [review, setReview] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('inside onsubmit');
    axios
      .post('/user/rate-newsletter', {
        rating: rating,
        review: review,
        newsletterId: newsletterId,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error in submitting your review.');
      });
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar alt={title} src={imageUrl} />}
        title={<Link to={`/newsletter/${newsletterId}`}>{title}</Link>}
      />
      <CardActionArea>
        <CardContent className='p-1'>
          <form onSubmit={onSubmit} className='w-100'>
            <div className='row m-0 p-0 px-2 justify-content-center'>
              <div className='col-xs-12 col-md-12 m-0 p-0'>
                <Label htmlFor='rating'>Rating</Label>
                <br />
                <Rating
                  name='rating'
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                  size='large'
                  className='w-100'
                  emptyIcon={<StarBorderIcon fontSize='inherit' />}
                />
              </div>
            </div>
            <div className='row m-0 p-0 px-2 justify-content-center'>
              <div className='col-xs-12 col-md-12 m-0 p-0'>
                <Label htmlFor='password'>Review</Label>
                <br />
                <TextArea
                  onChange={(e) => setReview(e.target.value)}
                  type='text'
                  value={review}
                  placeholder='share your views here...'
                />
              </div>
            </div>
            <div className='row m-0 mb-3 p-0 justify-content-around'>
              <div className='col-xs-12 col-md-4 m-0 p-0 my-1 centerFlex'>
                <PrimaryButton modifiers={['success']} type='submit'>
                  Submit
                </PrimaryButton>
              </div>
              <div className='col-xs-12 col-md-4 m-0 p-0 my-1 centerFlex'>
                <PrimaryButton modifiers={['warning']} onClick={onCancel}>
                  Cancel
                </PrimaryButton>
              </div>
            </div>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
