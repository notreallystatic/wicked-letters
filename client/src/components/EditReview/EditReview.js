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

export const EditReview = ({ prevReview }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(prevReview.rating);
  const [review, setReview] = useState(prevReview.review);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put('/user/rate-newsletter', {
        reviewId: prevReview._id,
        rating: rating,
        review: review,
        newsletterId: prevReview.newsletterId,
      })
      .then((res) => {
        alert('Successfully edited your review');
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error in editing your review.');
      });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            alt={prevReview.newsletterId.title}
            src={prevReview.newsletterId.imageUrl}
          />
        }
        title={
          <Link to={`/newsletter/${prevReview.newsletterId._id}`}>
            {prevReview.newsletterId.title}
          </Link>
        }
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
                />
              </div>
            </div>
            <div className='row m-0 p-0'>
              <PrimaryButton
                type='submit'
                modifiers={['warning']}
                style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}
              >
                <Icon>edit</Icon>
                Submit
              </PrimaryButton>
            </div>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
