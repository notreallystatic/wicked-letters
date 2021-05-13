import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/auth/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(setUser({ token: res.data['access-token'] }));
        props.history.push('/dashboard');
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
