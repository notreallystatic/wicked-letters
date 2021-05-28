import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../Spinner';
import { Image } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import style from './ShowCategory.module.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const ShowCategory = (props) => {
  const classes = useStyles();
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});

  const redirect = (id) => {
    props.history.push('/newsletter/' + id);
  };

  useEffect(() => {
    const categoryId = props.match.params.id;
    axios
      .get('/user/categories/' + categoryId)
      .then((res) => {
        console.log(res.data);
        setNewsletters(res.data.newsletters);
        setCategory({
          _id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          imageUrl: res.data.imageUrl,
        });
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
              src={category.imageUrl}
              rounded
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className={`col-md-7 col-xs-12 `}>
            <Typography gutterBottom variant='h5' component='h2'>
              {category.title}
            </Typography>
            <Typography variant='body2' component='p'>
              {category.description}
            </Typography>
            <Typography variant='body2' component='p' className='my-3'>
              <i className='fas fa-box-open'></i>&nbsp;{newsletters.length}{' '}
              Newsletters
            </Typography>
          </div>
        </div>
        <div className='row m-0 my-3 p-0 '>
          {newsletters.map((nl, index) => {
            return (
              <Col xs={12} md={6} lg={4} className={`my-3`} key={index}>
                <Card
                  className={classes.root + ' ' + style.card}
                  onClick={() => redirect(nl._id)}
                >
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      alt='logo'
                      height='140'
                      image={nl.imageUrl}
                      title={nl.title}
                      style={{ maxHeight: '40vh!important' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {nl.title}
                      </Typography>
                      <Box
                        component='fieldset'
                        mb={3}
                        borderColor='transparent'
                      >
                        <Rating
                          name='disabled'
                          value={nl.rating}
                          readOnly
                          precision={0.5}
                          emptyIcon={<StarBorderIcon fontSize='inherit' />}
                          size='large'
                        />
                        <Typography variant='caption' display='block'>
                          {nl.reviews.length}&nbsp; reviews
                        </Typography>
                      </Box>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        {nl.description.substr(
                          0,
                          Math.min(nl.description.length, 100)
                        )}
                        ...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Col>
            );
          })}
        </div>
      </div>
    </>
  );
};
