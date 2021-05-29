import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux';
import { Label, PrimaryButton, Input } from '../styled-components';
import style from './Register.module.css';
import { Illustrations } from '../../utils';
import Icon from '@material-ui/core/Icon';

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
      <p className='my-4 w-100 text-center'>
        Welcome aboard! Let us sign you up, real quick.
      </p>
      <div className={style.register}>
        <div className='row p-0 m-0 '>
          <img
            src={Illustrations.Register}
            alt=''
            className={style.illustration}
          />
        </div>
        <div className='row p-0 m-0  justify-content-center'>
          <div className='col-xs-12 col-md-4 '>
            <form onSubmit={onSubmit}>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type='email'
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  value={password}
                />
              </div>
              <PrimaryButton
                type='submit'
                className={`mt-4 mb-2 ${style.center}`}
              >
                <Icon>person_add</Icon>
                Register
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
