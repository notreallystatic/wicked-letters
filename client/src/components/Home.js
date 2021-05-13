import React from 'react';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/register'>Register</Link>
    </div>
  );
};
