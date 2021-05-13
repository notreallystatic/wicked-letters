import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from './Spinner';

export const Dashboard = (props) => {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get('/user/get-info')
      .then((res) => {
        setInfo(JSON.stringify(res.data.message));
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>{info} </div>
          <button onClick={getData}>get user info</button>
        </>
      )}
    </div>
  );
};
