import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import style from './Header.module.css';
import { Icons } from '../../utils';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import { PrimaryButton } from '../styled-components';
import Icon from '@material-ui/core/Icon';

export const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  const onLogout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        alert(res.data.message);
        dispatch(removeUser());
        window.location.reload();
        // props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Navbar className={style.nav} collapseOnSelect expand='lg'>
      <Link to='/' className={style.navBrand}>
        Wicked
        <br />
        Letters
      </Link>
      <Navbar.Toggle aria-controls='responsive-navbar-nav'>
        <img
          alt='icon'
          src={Icons.NavbarCollapse}
          style={{ transform: 'scale(0.7)' }}
        />
      </Navbar.Toggle>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'></Nav>
        {user ? (
          <>
            <Nav>
              <Link to='/categories'>
                <Icon>category</Icon>Browse Categories
              </Link>
              <Link to='/dashboard'>
                <Icon>account_circle</Icon>
                {user.name}
                <strong></strong>
              </Link>
              <PrimaryButton
                modifiers={['small', 'warning']}
                onClick={onLogout}
              >
                <Icon>logout</Icon>Logout
              </PrimaryButton>
            </Nav>
          </>
        ) : (
          <>
            <Nav>
              <Link to='/categories'>
                <Icon>category</Icon>Browse Categories
              </Link>
              <Link to='/login'>
                <Icon>login</Icon>Login
              </Link>
              <Link to='/register'>
                <Icon>person_add</Icon>Register
              </Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
