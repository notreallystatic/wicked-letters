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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export const Newsletter = (props) => {
  const classes = useStyles();
  const [newsletter, setNewsletter] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user, shallowEqual);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const newsletterId = props.match.params.id;
    axios
      .get('/user/newsletter/' + newsletterId)
      .then((res) => {
        console.log(res.data);
        setNewsletter(res.data);
        setReviews(res.data.reviews);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return loading ? (
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
                value={parseFloat(
                  newsletter.rating / newsletter.reviews.length
                )}
                readOnly
                precision={0.5}
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
          </div>
        </div>
        <div className='row m-0 my-3 p-0 '>
          {reviews.map((review, index) => {
            return (
              <Col xs={6} md={4} lg={3} className={`my-3`} key={index}>
                <Card
                  className={classes.root + ' ' + style.card}
                  onClick={() => handleOpen(index)}
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
                  {user && user._id === review.userId ? (
                    <CardActions>
                      <IconButton modifiers={['small', 'warning']}>
                        <Icon>mode_edit</Icon>
                      </IconButton>
                      <IconButton modifiers={['small', 'error']}>
                        <Icon>delete_outline</Icon>
                      </IconButton>
                    </CardActions>
                  ) : null}
                </Card>
              </Col>
            );
          })}
          <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <Card
              className={classes.root + ' ' + style.card + ' ' + classes.paper}
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
                  <IconButton modifiers={['small', 'warning']}>
                    <Icon>mode_edit</Icon>
                  </IconButton>
                  <IconButton modifiers={['small', 'error']}>
                    <Icon>delete_outline</Icon>
                  </IconButton>
                </CardActions>
              ) : null}
            </Card>
          </Modal>
        </div>
      </div>
    </>
  );
};