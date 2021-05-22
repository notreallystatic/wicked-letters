import React, { useState, useEffect } from 'react';
import style from './BrowseCategories.module.css';
import { Row, Col, Card } from 'react-bootstrap';
import { Spinner } from '../Spinner';

export const Search = () => {
  return (
    <div className={style.search}>
      <input type='text' id='search' placeholder='Search...'></input>
      <button>
        <span className='fas fa-search'></span>
      </button>
    </div>
  );
};

export const BrowseCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCategories([]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Row className='m-0 p-0 deb'>
            <Search />
          </Row>
          <Row className='m-0 p-0 deb'></Row>
        </div>
      )}
    </>
  );
};
