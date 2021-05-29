import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../Spinner';
import { Image } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import style from './Newsletter.module.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useSelector, shallowEqual } from 'react-redux';
import { IconButton } from '../styled-components';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { Illustrations } from '../../utils';
import Modal from '@material-ui/core/Modal';
import { AddReview } from '../AddReview/AddReview.js';
import { EditReview } from '../EditReview/EditReview.js';
import { DeleteReview } from '../DeleteReview/DeleteReview.js';
import { PrimaryButton } from '../styled-components';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
    height: '100%',
  },
  reviewCard: {
    height: '100%',
    maxHeight: 250,
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  fab: {
    margin: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '100%',
  },
}));

export const Newsletter = (props) => {
  const classes = useStyles();
  const [newsletter, setNewsletter] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user, shallowEqual);
  const [open, setOpen] = useState(false);
  const [reviewPresent, setReviewPresent] = useState(-1);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEdit = (index) => {
    setIndex(index);
    setEditModal(true);
  };

  const onAdd = () => {
    setAddModal(true);
  };

  const onDelete = (index) => {
    setIndex(index);
    setDeleteModal(true);
  };

  useEffect(() => {
    const newsletterId = props.match.params.id;
    axios
      .get('/user/newsletter/' + newsletterId)
      .then((res) => {
        setNewsletter(res.data);
        setReviews(res.data.reviews);
        res.data.reviews.forEach((review, index) => {
          if (review.userId === user._id) {
            setReviewPresent(index);
          }
        });
      })
      .catch((err) => {
        console.log('Error in submitting your review.');
      });
  }, []);

  return !(newsletter && reviews) ? (
    <Spinner />
  ) : (
    <>
      <div className='push-up'>
        <div
          className={`row px-0 py-4 m-0  `}
          style={{ background: '#320E3B', color: 'white' }}
        >
          <div className={`col-md-5 col-xs-12 m-0 `}>
            <Image
              src={newsletter.imageUrl}
              rounded
              className={style.newsletterImage}
              style={{ maxWidth: '100%', maxHeight: '40vh' }}
            />
          </div>
          <div className={`col-md-7 col-xs-12 `}>
            <Typography gutterBottom variant='h5' component='h2'>
              <a href={newsletter.url} target='_blank'>
                <Icon>link</Icon>
                &nbsp;
                {newsletter.title}
              </a>
            </Typography>
            <Box component='fieldset' mb={3} borderColor='transparent'>
              <Rating
                name='disabled'
                value={newsletter.rating}
                readOnly
                precision={0.1}
                size='large'
                emptyIcon={<StarBorderIcon fontSize='inherit' />}
                style={{
                  borderRadius: '2px',
                  background: '#8a6092',
                }}
              />
              <Typography variant='body2' component='p'>
                <i className='fas fa-box-open'></i>&nbsp;{reviews.length}{' '}
                Reviews
              </Typography>
            </Box>
            <Typography variant='body2' component='p'>
              {newsletter.description}
            </Typography>
            <Box component='fieldset' borderColor='transparent'>
              <div className='row m-0 mt-3 p-0 '>
                {' '}
                {reviewPresent > -1 ? (
                  <div className='row m-0 p-0 w-100'>
                    <div className='col-6 m-0 p-0 py-1'>
                      <PrimaryButton
                        modifiers={['warning']}
                        onClick={() => onEdit(reviewPresent)}
                      >
                        <small>
                          <Icon style={{ fontSize: '1rem' }}>edit</Icon>
                          &nbsp; Edit Review
                        </small>
                      </PrimaryButton>
                    </div>
                    <div className='col-6 m-0 p-0 py-1'>
                      <PrimaryButton
                        modifiers={['error']}
                        onClick={() => onDelete(reviewPresent)}
                      >
                        <small>
                          <Icon style={{ fontSize: '1rem' }}>delete</Icon>&nbsp;
                          Delete
                        </small>
                      </PrimaryButton>
                    </div>
                  </div>
                ) : user && user.isVerified ? (
                  <div className='col-xs-12 col-md-4 m-0 p-0 my-1'>
                    <PrimaryButton modifiers={['success']} onClick={onAdd}>
                      <Icon>add</Icon>Review
                    </PrimaryButton>
                  </div>
                ) : user ? (
                  <div className='col-xs-12 col-md-4 m-0 p-0 my-1 warning'>
                    <PrimaryButton disabled>
                      <Icon>add</Icon>Review
                    </PrimaryButton>
                    <br />
                    <small>Verify your account to add your review.</small>
                  </div>
                ) : (
                  <div className='col-xs-12 col-md-4 m-0 p-0 my-1 warning'>
                    <PrimaryButton disabled>
                      <Icon>add</Icon>Review
                    </PrimaryButton>
                    <br />
                    <small>Sign in to add your review.</small>
                  </div>
                )}
              </div>
            </Box>
          </div>
        </div>
        <div className='row m-0 my-3 p-1 '>
          {reviews.map((review, index) => {
            return (
              <Col xs={6} md={4} lg={3} className={`my-3 mx-0 p-2`} key={index}>
                <Card className={classes.card + ' ' + style.card}>
                  <div
                    onClick={() => handleOpen(index)}
                    className='hoverCursor'
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={review.name}
                          src={Illustrations.ProfilePicture}
                          className={classes.root}
                        />
                      }
                      title={review.name}
                      subheader={
                        <>
                          <Rating
                            name='disabled'
                            value={review.rating}
                            readOnly
                            size='small'
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize='inherit' />}
                          />
                          <Typography variant='caption' display='block'>
                            {review.rating}&nbsp; stars
                          </Typography>
                        </>
                      }
                    />
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {review.review.substr(
                            0,
                            Math.min(review.review.length, 100)
                          )}
                          ...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </div>
                  {user && user._id === review.userId ? (
                    <CardActions>
                      <IconButton
                        modifiers={['small', 'warning']}
                        onClick={() => onEdit(index)}
                      >
                        <Icon>mode_edit</Icon>
                      </IconButton>
                      <IconButton
                        modifiers={['small', 'error']}
                        onClick={() => onDelete(index)}
                      >
                        <Icon>delete_outline</Icon>
                      </IconButton>
                    </CardActions>
                  ) : user && user.isAdmin ? (
                    <CardActions>
                      <IconButton
                        modifiers={['small', 'error']}
                        onClick={() => onDelete(index)}
                      >
                        <Icon>delete_outline</Icon>
                      </IconButton>
                    </CardActions>
                  ) : null}
                </Card>
              </Col>
            );
          })}
          {reviews.length > 0 ? (
            <Modal
              open={open}
              onClose={handleClose}
              className={classes.modal}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              <Card
                className={
                  classes.root + ' ' + style.card + ' ' + classes.paper
                }
                onClick={() => handleOpen(index)}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={reviews[index].name}
                      src={Illustrations.ProfilePicture}
                      className={classes.root}
                    />
                  }
                  title={reviews[index].name}
                  subheader={
                    <>
                      <Rating
                        name='disabled'
                        value={reviews[index].rating}
                        readOnly
                        size='small'
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize='inherit' />}
                      />
                      <Typography variant='caption' display='block'>
                        {reviews[index].rating}&nbsp; stars
                      </Typography>
                    </>
                  }
                />
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {reviews[index].review}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {user && user._id === reviews[index].userId ? (
                  <CardActions>
                    <IconButton
                      modifiers={['small', 'warning']}
                      onClick={onEdit}
                    >
                      <Icon>mode_edit</Icon>
                    </IconButton>
                    <IconButton
                      modifiers={['small', 'error']}
                      onClick={onDelete}
                    >
                      <Icon>delete_outline</Icon>
                    </IconButton>
                  </CardActions>
                ) : null}
              </Card>
            </Modal>
          ) : null}

          <Modal
            open={addModal}
            onClose={() => setAddModal(false)}
            className={`${classes.modal} m-0 p-0`}
          >
            {newsletter ? (
              <AddReview
                newsletterId={props.match.params.id}
                imageUrl={newsletter.imageUrl}
                title={newsletter.title}
              />
            ) : null}
          </Modal>
          <Modal
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            className={`${classes.modal} m-0 p-0`}
          >
            {newsletter && reviews.length ? (
              <DeleteReview
                reviewId={reviews[index]._id}
                newsletterId={props.match.params.id}
                onClose={() => setDeleteModal(false)}
              />
            ) : null}
          </Modal>
          <Modal
            open={editModal}
            onClose={() => setEditModal(false)}
            className={`${classes.modal} m-0 p-0`}
          >
            {newsletter && reviews.length ? (
              <EditReview
                prevReview={reviews[index]}
                onClose={() => setEditModal(false)}
              />
            ) : null}
          </Modal>
        </div>
      </div>
    </>
  );
};
