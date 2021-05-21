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

export const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  const onLogout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        alert(res.data.message);
        dispatch(removeUser());
        props.history.push('/');
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
      <Search />
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
            Signed in as {user.name}
            &nbsp;
            <PrimaryButton modifiers='warning' onClick={onLogout}>
              Logout
            </PrimaryButton>
          </>
        ) : (
          <>
            <Nav>
              <Link to='#'>Browse Categories</Link>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
