import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux';
import { Label, PrimaryButton, Input } from '../styled-components';
import style from './Login.module.css';
import { Illustrations } from '../../utils';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/auth/login', {
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
    <div className=''>
      <div className='row mx-0 my-3  justify-content-center'>Welcome back!</div>
      <div className={`row  ${style.login} p-0`}>
        <div className={`col-xs-12 col-md-7 m-0 p-0 `}>
          <img
            src={Illustrations.Login}
            className={`${style.center} ${style.illustration}`}
            alt='illustration'
          />
        </div>
        <div className={`col-xs-12 col-md-5 m-0 p-0  ${style.content}`}>
          <div className='row align-items-center h-100 w-100 justify-content-center m-0 p-0'>
            <div className='row m-0 p-0'>
              <h3 className='text-center my-2 w-100'>Sign in</h3>
              <form onSubmit={onSubmit} className='w-100'>
                <div className='row m-0 p-0 px-4 justify-content-center'>
                  <div className='col-xs-12 col-md-8 m-0 p-0'>
                    <Label htmlFor='email'>Email</Label>
                    <br />
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type='email'
                    />
                  </div>
                </div>
                <div className='row m-0 p-0 px-4 justify-content-center'>
                  <div className='col-xs-12 col-md-8 m-0 p-0'>
                    <Label htmlFor='password'>Password</Label>
                    <br />
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      value={password}
                    />
                  </div>
                </div>
                <div className='row m-0 p-0'>
                  <PrimaryButton
                    type='submit'
                    className={style.center + ' my-4'}
                  >
                    Log in
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
