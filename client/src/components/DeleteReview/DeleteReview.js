import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    maxWidth: '100%',
    margin: 'auto',
  },
}));

export const DeleteReview = ({ reviewId, newsletterId, onClose }) => {
  const classes = useStyles();

  const onDelete = () => {
    axios
      .delete('/user/rate-newsletter', {
        data: {
          reviewId,
          newsletterId,
        },
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert('Error in deleting your review.');
      });
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Card className={classes.card}>
      <CardHeader title='Are you sure you want to delete this review?' />
      <CardActionArea>
        <div className='row m-0 mb-3 p-0 justify-content-around'>
          <div className='col-xs-12 col-md-4 m-0 p-0 my-1 centerFlex'>
            <PrimaryButton modifiers={['error']} onClick={onDelete}>
              <Icon>delete</Icon>
              Delete
            </PrimaryButton>
          </div>
          <div className='col-xs-12 col-md-4 m-0 p-0 my-1 centerFlex'>
            <PrimaryButton modifiers={['warning']} onClick={onCancel}>
              <Icon>cancel</Icon>
              Cancel
            </PrimaryButton>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};
