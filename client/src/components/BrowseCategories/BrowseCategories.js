import React, { useState, useEffect } from 'react';
import style from './BrowseCategories.module.css';
import { Row, Col } from 'react-bootstrap';
import { Spinner } from '../Spinner';
import axios from 'axios';
import Fuse from 'fuse.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const Search = ({ categories, setShowCategories }) => {
  const onChange = (e) => {
    if (e.target.value === '') {
      setShowCategories([...categories]);
    } else {
      const options = {
        includeScore: true,
        keys: ['title'],
      };
      const fuse = new Fuse(categories, options);
      const result = fuse.search(e.target.value).map((item) => item.item);
      setShowCategories([...result]);
    }
  };

  return (
    <div className={style.search}>
      <input
        type='text'
        id='search'
        placeholder='Search...'
        onChange={onChange}
      ></input>
      <button>
        <span className='fas fa-search'></span>
      </button>
    </div>
  );
};

export const BrowseCategories = (props) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/user/categories')
      .then((res) => {
        setShowCategories([...res.data.categories]);
        setCategories([...res.data.categories]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const redirect = (id) => {
    props.history.push('/categories/' + id);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Row className='m-0 p-0 '>
            <Search
              categories={categories}
              setShowCategories={setShowCategories}
            />
          </Row>
          <Row className='m-0 p-0 '>
            {showCategories.map((cat, index) => {
              return (
                <Col xs={12} md={6} lg={4} className={`my-3`} key={index}>
                  <Card
                    className={classes.root + ' ' + style.card}
                    onClick={() => redirect(cat._id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        alt='logo'
                        height='140'
                        image={cat.imageUrl}
                        title={cat.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {cat.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {cat.description.substr(
                            0,
                            Math.min(cat.description.length, 100)
                          )}
                          ...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
};
