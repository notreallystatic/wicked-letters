import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Spinner } from '../Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '../styled-components';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Illustrations } from '../../utils';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import style from './Dashnoard.module.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { EditReview } from '../EditReview/EditReview.js';
import { DeleteReview } from '../DeleteReview/DeleteReview.js';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
  },
  reviewCard: {
    height: '100%',
    maxHeight: 220,
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '100%',
  },
}));

export const Dashboard = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get('/user/reviews')
      .then((res) => {
        console.log(res.data);
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

  const onEdit = (index) => {
    setIndex(index);
    setEditModal(true);
  };

  const onDelete = (index) => {
    setIndex(index);
    setDeleteModal(true);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='row m-0 p-0 '>
            <div className='col-xs-12 col-md-5 m-0 p-0 '>
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
                        color={user.isVerified ? 'primary' : 'secondary'}
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
            <div className='row col-xs-12 col-md-7 m-0 p-0 '>
              <p className='m-0 mb-2 p-0 my-2 text-center w-100 '>
                Reviews posted by you: {reviews.length}
              </p>
              {reviews.map((review, index) => {
                return (
                  <Col
                    xs={6}
                    md={6}
                    lg={6}
                    className={`my-3 m-0 p-1 `}
                    key={index}
                  >
                    <Card className={classes.card + ' ' + classes.reviewCard}>
                      <div
                        onClick={() => handleOpen(index)}
                        className='hoverCursor'
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              alt={review.newsletterId.title}
                              src={review.newsletterId.imageUrl}
                              className={classes.root}
                            />
                          }
                          title={
                            <Link to={`/newsletter/${review.newsletterId._id}`}>
                              {review.newsletterId.title}
                            </Link>
                          }
                          subheader={
                            <>
                              <Rating
                                name='disabled'
                                value={review.rating}
                                readOnly
                                size='small'
                                precision={0.5}
                                emptyIcon={
                                  <StarBorderIcon fontSize='inherit' />
                                }
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
                                Math.min(review.review.length, 40)
                              )}
                              ...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </div>
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
                    </Card>
                  </Col>
                );
              })}
              <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
              >
                {reviews.length ? (
                  <Card
                    className={
                      classes.root + ' ' + style.card + ' ' + classes.paper
                    }
                    onClick={() => handleOpen(index)}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={reviews[index].newsletterId.title}
                          src={reviews[index].newsletterId.imageUrl}
                        />
                      }
                      title={
                        <Link
                          to={`/newsletter/${reviews[index].newsletterId._id}`}
                        >
                          {reviews[index].newsletterId.title}
                        </Link>
                      }
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
                  </Card>
                ) : null}
              </Modal>
              <Modal
                open={editModal}
                onClose={() => setEditModal(false)}
                className={`${classes.modal} m-0 p-0`}
              >
                {reviews.length ? (
                  <EditReview prevReview={reviews[index]} />
                ) : null}
              </Modal>
              <Modal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                className={`${classes.modal} m-0 p-0`}
              >
                {reviews.length ? (
                  <DeleteReview
                    reviewId={reviews[index]._id}
                    newsletterId={reviews[index].newsletterId._id}
                    onClose={() => setDeleteModal(false)}
                  />
                ) : null}
              </Modal>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
