import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { store, setUser } from './redux';
import { useDispatch } from 'react-redux';
import Interceptor from './services/axiosInterceptor';
import {
  Header,
  Footer,
  Login,
  Register,
  Home,
  Dashboard,
  PrivateRoute,
  PublicRoute,
  Spinner,
  BrowseCategories,
  ShowCategory,
  Newsletter,
} from './components';
import './App.css';

Interceptor.interceptor(store);

export const App = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get('/auth/refresh-access-token')
        .then((res) => {
          const token = res.data['access-token'];
          dispatch(setUser({ token: token }));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  });

  return (
    <>
      <div>
        <Header />
        {loading ? (
          <Spinner />
        ) : (
          <div className='body-content'>
            <Switch>
              <PublicRoute exact path='/' component={Home} />
              <PublicRoute exact path='/register' component={Register} />
              <PublicRoute exact path='/login' component={Login} />
              <Route exact path='/categories' component={BrowseCategories} />
              <Route exact path='/categories/:id' component={ShowCategory} />
              <Route exact path='/newsletter/:id' component={Newsletter} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        )}
        <Footer />
      </div>
      <div className='push'></div>
    </>
  );
};
