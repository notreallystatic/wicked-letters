import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

export const Footer = (props) => {
  return (
    <div className={style.footer}>
      <div className='row justify-content-around'>
        <div className={`col-lg-3 col-md-12 text-center ${style.brand} my-2`}>
          Wicked Letters
          <br />
          <small>
            <i className='fas fa-map-marker-alt'></i>&nbsp;Remote
          </small>
        </div>
        <div className='col-lg-3 '></div>
        <div className='col-lg-4  my-2'>
          <div className='row align-items-center h-100'>
            <div className='col-4 text-center'>
              <Link to='#'>About Us</Link>
            </div>
            <div className='col-4 text-center'>
              <Link to='#'>Contact Us</Link>
            </div>
            <div className='col-4 text-center'>
              <Link to='#'>Complaints</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${style.copyright}`}>
        <i className='fas fa-copyright'></i>&nbsp;Copyright 2021
      </div>
    </div>
  );
};
